import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ISaveVehicle } from '../models/saveVehicle';

@Injectable()
export class VehicleService {

	constructor(private http: Http) { }

	getFeatures() {
		return this.http.get('/api/features')
			.map(res => res.json());
	}

	getMakes() {
		return this.http.get('/api/makes')
			.map(res => res.json());
	}

	create(vehicle: ISaveVehicle) {
		return this.http.post('/api/vehicles', vehicle)
			.map(res => res.json());
	}

	getVehicle(id: number) {
		return this.http.get('/api/vehicles/' + id)
			.map(res => res.json());
	}

	update(vehicle: ISaveVehicle) {
		return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
			.map(res => res.json());
	}
}
