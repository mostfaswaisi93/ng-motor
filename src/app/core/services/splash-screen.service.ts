import { ElementRef, Injectable } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';

@Injectable()
export class SplashScreenService {

	private el: ElementRef;
	private stopped: boolean;
	public spinnerEnabled: boolean;

	constructor(private animationBuilder: AnimationBuilder) { }

	init(element: ElementRef) {
		this.el = element;
	}

	hide() {
		if (this.stopped) {
			return;
		}

		const player = this.animationBuilder.build([
			style({ opacity: '1' }),
			animate(800, style({ opacity: '0' }))
		]).create(this.el.nativeElement);

		player.onDone(() => {
			if (typeof this.el.nativeElement.remove === 'function') {
				this.el.nativeElement.remove();
			} else {
				this.el.nativeElement.style.display = 'none';
			}
			this.stopped = true;
			this.spinnerEnabled = this.stopped;
		});
		setTimeout(() => player.play(), 200);
	}

}
