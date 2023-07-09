import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notice } from './notice.interface';
import { messageType } from '../../../core/enum/enum';

@Injectable({
	providedIn: 'root'
})
export class NoticeService {

	onNoticeChanged$: BehaviorSubject<Notice>;

	constructor() {
		this.onNoticeChanged$ = new BehaviorSubject(null);
	}

	setNotice(message: string, type?: messageType) {
		const notice: Notice = {
			message,
			type
		};
		this.onNoticeChanged$.next(notice);
	}

	removeNotice() {
		this.onNoticeChanged$.next(null);
	}

}
