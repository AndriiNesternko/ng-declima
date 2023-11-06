import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Coord, HourlyTemp, IWeather } from '../../interfaces/weather';
import { IAir } from 'src/app/interfaces/air';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'temperature-now',
  templateUrl: './temperature-now.component.html',
  styleUrls: ['./temperature-now.component.css'],
})
export class TemperatureNowComponent implements OnInit, OnDestroy {
  iconURL: string = '';
  cityName: string = '';
  weatherDescription: string = '';
  temperature: number = 0;
  maxTemperature: number = 0;
  minTemperature: number = 0;
  windSpeed: number = 0;
  humidity: number = 0;
  cloudiness: number = 0;

  isError: boolean = true;

  // Childcomponent data properties
  airQuality: IAir | undefined;
  hourlyTempList: HourlyTemp[] = [];

  // Subject to signal component destruction
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData(): void {
    if (this.cityName) {
      this.weatherService
        .getWeather(this.cityName)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (res: IWeather) => {
            this.populateWeatherData(res);
            this.getAirQuality(res.city.coord);
            this.getFourDaysWeather(res);
            this.isError = false;
          },
          error: () => {
            this.handleErrors();
          },
        });
    }
  }

  private handleErrors() {
    this.isError = true;
    this.clearWeatherData();
  }

  private clearWeatherData() {
    this.iconURL = '';
    this.cityName = '';
    this.weatherDescription = '';
    this.temperature = 0;
    this.maxTemperature = 0;
    this.minTemperature = 0;
    this.windSpeed = 0;
    this.humidity = 0;
    this.cloudiness = 0;
    this.airQuality = undefined;
    this.hourlyTempList = [];
  }

  private populateWeatherData(data: IWeather) {
    const weatherData = data.list[0];
    this.temperature = weatherData.main.temp;
    this.maxTemperature = weatherData.main.temp_max;
    this.minTemperature = weatherData.main.temp_min;
    this.cloudiness = weatherData.clouds.all;
    this.humidity = weatherData.main.humidity;
    this.windSpeed = weatherData.wind.speed;
    this.weatherDescription = weatherData.weather[0].description;
    this.iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  }

  private getAirQuality(coord: Coord) {
    this.weatherService
      .getAir(coord)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (res: IAir) => {
          this.airQuality = res;
        },
        error: () => {
          this.airQuality = undefined;
        },
      });
  }

  private getFourDaysWeather(data: IWeather): void {
    for (let i = 1; i < 5 && i < data.list.length; i++) {
      const weatherData = data.list[i];
      const hourlyTemp: HourlyTemp = {
        tMax: weatherData.main.temp_max,
        tMin: weatherData.main.temp_min,
        iconURL: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      };
      this.hourlyTempList.push(hourlyTemp);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.clearWeatherData();
      this.cityName = form.value.city;
      this.getWeatherData();
      form.reset();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

//First try
// export class TemperatureNowComponent implements OnInit {
//   getWeatherData() {
//     if (this.cityName) {
//       this.weatherService.getWeather(this.cityName).subscribe({
//         next: (res) => {
//           this.temperature = res.list[0].main.temp;
//           this.maxTemperature = res.list[0].main.temp_max;
//           this.minTemperature = res.list[0].main.temp_min;
//           this.cloudiness = res.list[0].clouds.all;
//           this.humidity = res.list[0].main.humidity;
//           this.windSpeed = res.list[0].wind.speed;
//           this.weatherDescription = res.list[0].weather[0].description;
//           this.iconURL =
//             'https://openweathermap.org/img/wn/' +
//             res.list[0].weather[0].icon +
//             '@2x.png';

//           this.getAirQuality(res.city.coord);
//           this.getFourDaysWeather(res);
//           this.isError = false;
//         },

//         error: () => {
//           this.isError = true;
//         },
//       });
//     }
//   }

//   getAirQuality(coord: Coord) {
//     this.weatherService.getAir(coord).subscribe((res: IAir) => {
//       this.airQuality = res;
//     });
//   }

//   getFourDaysWeather(res: IWeather) {
//     for (let i = 1; i <= 4; i++) {
//       let elem = {
//         tMax: res.list[i].main.temp_max,
//         tMin: res.list[i].main.temp_min,
//         // iconURL:
//         //   'https://openweathermap.org/img/wn/' +
//         //   res.list[i].weather[0].icon +
//         //   '@2x.png',
//         iconURL: `https://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png`,
//       };
//       this.hourlyTempList.push(elem);
//     }
//   }

//   onSumbmit(form: NgForm) {
//     if (form.valid) {
//       this.cityName = form.value.city;
//       this.hourlyTempList = [];
//       this.getWeatherData();
//       form.reset();
//     }
//   }
// }
