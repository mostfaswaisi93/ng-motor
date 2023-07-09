import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'translator',
	pure: false
})
export class TranslatorPipe implements PipeTransform {
	constructor(private translateService: TranslateService) { }

	transform(attribute: string, obj: any): String {
		let attr: string = this.translateService.instant(attribute);
		if (obj[attr] && (<string>obj[attr]).toString().length > 0) {
			return obj[attr];
		} else {
			if (this.translateService.currentLang === 'en') {
				attr = attr.replace('En', 'Ar');
				return obj[attr];
			} else {
				attr = attr.replace('Ar', 'En');
				return obj[attr];
			}
		}
	}

}
