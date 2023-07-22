import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/core/services/services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.scss']
})
export class ServicesDetailsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showForm = false;
  service: Service = null;
  totalData = 0;
  dataPerPage = 10;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['title_ar', 'title_en', 'edit'];
  dataSource = new MatTableDataSource();
  url = environment.apiUrl;

  serviceData: Service[] = null;
  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {
    this.getData();
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: Service, filter: string): boolean {
      return data.title.ar && data.title.ar.toLowerCase().includes(filter) ||
        data.title.en && data.title.en.toLowerCase().includes(filter);
    };
    this.subscripFilters();
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

  onEdit(service): any {
    this.service = service;
    this.showForm = !this.showForm;
  }

  onDelete(service): any {
    this.service = service;
    console.log(this.service);
    this.servicesService.deleteService(this.service?._id).subscribe((data: any) => {
      console.log(data, 'delete');
      this.getData();
    });
  }

  onback(e) {
    this.showForm = !this.showForm;
    this.service = null;
    if (e && e.reloadData) {
      this.getData();
    }
  }

  getData() {
    this.servicesService.getServices().subscribe((data: any) => {
      this.serviceData = data?.data;
      this.dataSource.data = data?.data;
      this.dataSource.paginator = this.paginator;
      // this.applyFilter();
    });
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}