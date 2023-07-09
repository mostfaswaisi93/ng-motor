import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Subscription } from 'rxjs';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss']
})
export class ManageServicesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showForm = false;
  service: Service = null;
  totalData = 0;
  dataPerPage = 10;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['logo', 'title_ar', 'title_en', 'description_en', 'description_ar', 'edit'];
  dataSource = new MatTableDataSource();

  serviceData: Service[] = null;
  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor(private servicesService: ServicesService) {
    this.getData();
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: Service, filter: string): boolean {
      return data.nameAr && data.nameAr.toLowerCase().includes(filter);
    };
    // this.subscripFilters();
  }

  // subscripFilters() {
  //   const subscriptionMerge = merge(this.filterFormControl.valueChanges,
  //     this.effectiveFormControl.valueChanges).subscribe((val) => {
  //       this.applyFilter();
  //     });

  //   this.subscriptionList.push(subscriptionMerge);
  // }

  // applyFilter() {
  //   let filterValue = this.filterFormControl.value;
  //   this.dataSource.filter = '';
  //   if (!filterValue) return;
  //   filterValue = filterValue.trim().toLowerCase();
  //   this.dataSource.filter = filterValue;
  // }

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

  getData() {
    this.servicesService.getServices().subscribe((data: Service[]) => {
      this.serviceData = data;
      console.log(this.serviceData, 'serv');

      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      // this.applyFilter();
    });
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}