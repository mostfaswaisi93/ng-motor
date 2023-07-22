import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subscription } from 'rxjs';
import { ManagementService } from 'src/app/core/services/management.service';

@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss']
})
export class ManagementsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showForm = false;
  managementData: [];
  management: any;
  totalData = 0;
  dataPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['title_ar', 'title_en', 'phone', 'edit'];
  dataSource = new MatTableDataSource();

  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor(private managementService: ManagementService) {
    this.getData()
  }

  ngOnInit(): void {
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

  getData() {
    this.managementService.getGeneralManagement().subscribe((data: any) => {
      this.managementData = data?.data;
      this.dataSource.data = data?.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  onEdit(management): any {
    this.management = management
    this.showForm = !this.showForm;
  }

  onback(e) {
    this.showForm = !this.showForm;
    if (e && e.reloadData) {
      this.getData();
    }
  }

  onDelete(managementId) {
    this.managementService.deleteManagement(managementId).subscribe((data) => {
      if (data.success) {
        this.getData();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}