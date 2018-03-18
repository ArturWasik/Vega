import { IVehicle } from '../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { IKeyValuePair } from '../../models/shared';

@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
	vehicles: IVehicle[];
	makes: IKeyValuePair[];
	filter: any = {};

	constructor(private vehicleService: VehicleService) { }

	ngOnInit() {

		this.vehicleService.getMakes()
			.subscribe(makes => this.makes = makes);

		this.populateVehicles();
	}

	private populateVehicles() {
		this.vehicleService.getVehicles(this.filter)
			.subscribe(vehicles => this.vehicles = vehicles);
	}

	onFilterChange() {
		this.populateVehicles();
	}

	resetFilter() {
		this.filter = {};
		this.onFilterChange();
	}
}