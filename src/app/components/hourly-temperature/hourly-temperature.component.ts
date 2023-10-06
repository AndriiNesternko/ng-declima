import { Component, Input } from '@angular/core';
import { HourlyTemp } from 'src/app/interfaces/weather';

@Component({
  selector: 'hourly-temperature',
  templateUrl: './hourly-temperature.component.html',
  styleUrls: ['./hourly-temperature.component.css'],
})
export class HourlyTemperatureComponent {
  @Input() temperatureList!: HourlyTemp[];
}
