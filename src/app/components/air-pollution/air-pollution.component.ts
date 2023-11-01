import { Component, Input, OnChanges } from '@angular/core';

import { Coord, IAir } from 'src/app/interfaces/air';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.css'],
})
export class AirPollutionComponent implements OnChanges {
  @Input() coord!: Coord;

  so2: number = 0;
  no2: number = 0;
  pm10: number = 0;
  pm25: number = 0;
  o3: number = 0;
  co: number = 0;
  nh3: number = 0;
  no: number = 0;
  aqi: number = 0;

  constructor(private airService: WeatherService) {}

  ngOnChanges() {
    this.getAir();
  }

  getAir() {
    this.airService.getAir(this.coord).subscribe({
      next: (res: IAir) => {
        this.so2 = res.list[0].components.so2;
        this.no2 = res.list[0].components.no2;
        this.pm10 = res.list[0].components.pm10;
        this.pm25 = res.list[0].components.pm2_5;
        this.o3 = res.list[0].components.o3;
        this.co = res.list[0].components.co;
        this.nh3 = res.list[0].components.nh3;
        this.no = res.list[0].components.no;
        this.aqi = res.list[0].main.aqi;
      },
      error: (err) => console.log(err),
      complete: () => console.info('API air complete'),
    });
  }
}
