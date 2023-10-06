import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TemperatureNowComponent } from './components/temperature-now/temperature-now.component';
import { HourlyTemperatureComponent } from './components/hourly-temperature/hourly-temperature.component';
import { AirPollutionComponent } from './components/air-pollution/air-pollution.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureNowComponent,
    HourlyTemperatureComponent,
    AirPollutionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
