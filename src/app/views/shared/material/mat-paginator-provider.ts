import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe((e: Event) => {
      this.getPaginatorIntl();
    });

    this.getPaginatorIntl();
  }

  rangeLabel = (page: number, pageSize: number, length: number) => {

    let off = 'of';
    let to = 'to';
    let enteries = 'enteries';
    let showing = 'showing';
    let totalPages = 'count of pages:';

    const lang = this.translate.currentLang;

    if (lang == 'ar') {
      off = 'من';
      to = 'إلى';
      enteries = 'إدخالات';
      showing = 'إظهار';
      totalPages = 'عدد الصفحات';
    }

    if (length == 0 || pageSize == 0) { return `0 ${off} ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const pageCount = Math.ceil(length / pageSize);

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    if (lang == 'en') {
      return `${showing} ${startIndex + 1} ${to} ${endIndex} ${off} ${length} ${enteries} - ${totalPages} ${pageCount}`;
    } else {
      return `${totalPages} ${pageCount}
           -   ${showing} ${startIndex + 1} ${to} ${endIndex} ${off} ${length} ${enteries}`;
    }
  }

  getPaginatorIntl() {

    const lang = this.translate.currentLang;
    let firstPageLabel = 'first page';
    let itemsPerPageLabel = 'items per page:';
    let nextPageLabel = 'next page';
    let previousPageLabel = 'previous page';
    let lastPageLabel = 'last page';


    if (lang == 'ar') {
      firstPageLabel = 'أول صفحة';
      itemsPerPageLabel = 'عدد السجلات بالصفحة:';
      nextPageLabel = 'الصفحة التالية';
      previousPageLabel = 'الصفحة السابقة';
      lastPageLabel = 'اخر صفحة';
    }

    this.itemsPerPageLabel = itemsPerPageLabel;
    this.nextPageLabel = nextPageLabel;
    this.previousPageLabel = previousPageLabel;
    this.firstPageLabel = firstPageLabel;
    this.lastPageLabel = lastPageLabel;
    this.getRangeLabel = this.rangeLabel;
    this.changes.next();
  }

}