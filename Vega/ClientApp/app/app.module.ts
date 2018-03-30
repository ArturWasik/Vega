import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from "ng2-toasty";

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AppErrorHandler } from './components/app/app.error-handler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { ProgressService } from './services/progress.service';
import { BrowserXhrWithProgress } from './services/progress.service';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		CounterComponent,
		FetchDataComponent,
		HomeComponent,
		VehicleFormComponent,
		VehicleListComponent,
		PaginationComponent,
		ViewVehicleComponent,
		CallbackComponent,
		AdminComponent
	],
	imports: [
		CommonModule,
		ToastyModule.forRoot(),
		HttpModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'vehicles', pathMatch: 'full' },
			{ path: 'vehicles/new', component: VehicleFormComponent },
			{ path: 'vehicles/edit/:id', component: VehicleFormComponent },
			{ path: 'vehicles/:id', component: ViewVehicleComponent },
			{ path: 'vehicles', component: VehicleListComponent },
			{ path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
			{ path: 'home', component: HomeComponent },
			{ path: 'counter', component: CounterComponent },
			{ path: 'fetch-data', component: FetchDataComponent },
			{ path: '**', redirectTo: 'home' }
		])
	],
	providers: [
		{ provide: ErrorHandler, useClass: AppErrorHandler },
		{ provide: BrowserXhr, useClass: BrowserXhrWithProgress },
		VehicleService,
		PhotoService,
		ProgressService,
		AuthService,
		AuthGuard,
		AdminAuthGuard
	]
})
export class AppModuleShared {
}
