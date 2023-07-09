import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoticeService } from './notice.service';
import { Notice } from './notice.interface';
import { messageType } from '../../../core/enum/enum';

@Component({
	selector: 'app-notice',
	templateUrl: './notice.component.html',
})
export class NoticeComponent implements OnInit, OnDestroy {
	@Output() type: any;
	@Output() message: any = '';

	private subscriptions: Subscription[] = [];
	constructor(public noticeService: NoticeService, private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.subscriptions.push(this.noticeService.onNoticeChanged$.subscribe(
			(notice: Notice) => {
				notice = Object.assign({}, { message: '', type: '' }, notice);
				this.message = notice.message;
				switch (notice.type) {
					case messageType.success:
						this.type = 'success';
						break;
					case messageType.info:
						this.type = 'info';
						break;
					case messageType.warning:
						this.type = 'warning';
						break;
					case messageType.error:
						this.type = 'error';
						break;
					default:
						this.type = 'info';
						break;
				}
				this.cdr.markForCheck();
			}
		));
	}

	closeMessage() {
		this.noticeService.removeNotice();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

}
