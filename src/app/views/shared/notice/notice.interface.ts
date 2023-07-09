import { messageType } from '../../../core/enum/enum';

export interface Notice {
	type?: messageType;
	message: string;
}

