import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { merge, Subscription } from 'rxjs';
import { ManagementService } from 'src/app/core/services/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showForm = false;
  management: any;
  totalData = 0;
  dataPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['title_ar', 'title_en', 'phone', 'edit'];
  dataSource = new MatTableDataSource();
  url = environment.apiUrl;

  titleAr: any
  titleEn: any
  serviceId: any
  managementsData: [] = null;
  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private managementService: ManagementService
  ) {

  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.management.ar && data.management.ar.toLowerCase().includes(filter) ||
        data.management.en && data.management.en.toLowerCase().includes(filter);
    };
    this.subscripFilters();

    this.route.queryParams.subscribe((data) => {
      this.serviceId = data.id
    })

    this.getData();
  }

  subscripFilters() {
    const subscriptionMerge = merge(this.filterFormControl.valueChanges).subscribe((val) => {
      this.applyFilter();
    });

    this.subscriptionList.push(subscriptionMerge);
  }

  applyFilter() {
    let filterValue = this.filterFormControl.value;
    this.dataSource.filter = '';
    if (!filterValue) return;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onAdd() {
    this.showForm = !this.showForm;
  }

  onView() {
    this.router.navigateByUrl('/admin/services/services-details');
  }

  onEdit(management): any {
    this.management = management;
    this.showForm = !this.showForm;
  }

  onDelete(managementId) {
    this.managementService.deleteManagement(managementId).subscribe((data) => {
      if (data.success) {
        this.getData();
      }
    });
  }
  
  onback(e) {
    this.showForm = !this.showForm;
    this.management = null;
    if (e && e.reloadData) {
      this.getData();
    }
  }

  getData() {
    this.managementService.getManagementsForService(this.serviceId).subscribe((data: any) => {
      this.managementsData = data?.data;
      this.dataSource.data = data?.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}