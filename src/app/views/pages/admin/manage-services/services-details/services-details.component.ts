import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
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
  question: any;
  totalData = 0;
  dataPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = ['question_ar', 'question_en', 'edit'];
  dataSource = new MatTableDataSource();
  url = environment.apiUrl;

  titleAr: any
  titleEn: any
  serviceId: any
  questionData: [] = null;
  filterFormControl = new FormControl('');
  effectiveFormControl = new FormControl(1);
  subscriptionList: Subscription[] = [];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private servicesService: ServicesService
  ) {
 
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data: any, filter: string): boolean {
      return data.question.ar && data.question.ar.toLowerCase().includes(filter) ||
        data.question.en && data.question.en.toLowerCase().includes(filter);
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

  onEdit(question): any {
    this.question = question;
    this.showForm = !this.showForm;
  }

  onDelete(questionId): any {
    this.servicesService.deleteQuestion(this.serviceId, questionId).subscribe((data: any) => {
      this.getData();
    });
  }

  onback(e) {
    this.showForm = !this.showForm;
    this.question = null;
    if (e && e.reloadData) {
      this.getData();
    }
  }

  getData() {
    this.servicesService.getServiceQuestions(this.serviceId).subscribe((data: any) => {
      this.questionData = data?.data.questions;
      this.titleAr = data?.data.title.ar
      this.titleEn = data?.data.title.en
      this.dataSource.data = data?.data.questions;
      this.dataSource.paginator = this.paginator;
      // this.applyFilter();
    });
  }

  ngOnDestroy() {
    this.subscriptionList.map((el) => el.unsubscribe());
  }

}