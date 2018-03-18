import { IKeyValuePair, IContact } from './shared';

export interface IVehicle {
	id: number;
	model: IKeyValuePair;
	make: IKeyValuePair;
	isRegistered: boolean;
	features: IKeyValuePair[];
	contact: IContact;
	lastUpdate: string;
}

