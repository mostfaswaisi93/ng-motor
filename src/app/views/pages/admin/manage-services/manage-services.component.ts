import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss']
})
export class ManageServicesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showForm = false;
  totalData = 0;
  dataPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['nameAr', 'nameEn', 'phone', 'active', 'edit'];
  dataSource = new MatTableDataSource();

  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.subscripFilters();
  }

  subscripFilters() {
    const subscriptionMerge = merge(this.filterFormControl.valueChanges,
      this.effectiveFormControl.valueChanges).subscribe((val) => {
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

  onEdit(service): any {
    this.showForm = !this.showForm;
  }

  onback(e) {
    this.showForm = !this.showForm;
    if (e && e.reloadData) {
    }
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}