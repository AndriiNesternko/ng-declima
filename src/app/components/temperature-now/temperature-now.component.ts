import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Coord, HourlyTemp, IWeather } from '../../interfaces/weather';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'temperature-now',
  templateUrl: './temperature-now.component.html',
  styleUrls: ['./temperature-now.component.css'],
})
export class TemperatureNowComponent implements OnInit {
  iconURL: string = '';
  cityName: string = 'Kyiv';
  weatherDescription: string = '';

  temperature: number = 0;
  maxTemperature: number = 0;
  minTemperature: number = 0;

  windSpeed: number = 0;
  humidity: number = 0;
  cloudiness: number = 0;

  isError: boolean = true;

  coord: Coord = {
    lat: 0,
    lon: 0,
  };

  hourlyTempList: HourlyTemp[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherService.getWeather(this.cityName).subscribe({
      next: (res) => {
        this.temperature = res.list[0].main.temp;
        this.maxTemperature = res.list[0].main.temp_max;
        this.minTemperature = res.list[0].main.temp_min;
        this.cloudiness = res.list[0].clouds.all;
        this.humidity = res.list[0].main.humidity;
        this.windSpeed = res.list[0].wind.speed;
        this.weatherDescription = res.list[0].weather[0].description;
        this.iconURL =
          'https://openweathermap.org/img/wn/' +
          res.list[0].weather[0].icon +
          '@2x.png';

        this.coord = res.city.coord;

        this.getFourDaysWeather(res);

        this.isError = false;
      },

      error: () => {
        this.isError = true;
      },
      complete: () => console.info('API weather complete'),
    });
  }

  getFourDaysWeather(res: IWeather) {
    for (let i = 1; i < 5; i++) {
      let elem = {
        tMax: res.list[i].main.temp_max,
        tMin: res.list[i].main.temp_min,
        iconURL:
          'https://openweathermap.org/img/wn/' +
          res.list[i].weather[0].icon +
          '@2x.png',
      };
      this.hourlyTempList.push(elem);
    }
  }

  onSumbmit(form: NgForm) {
    if (form.valid) {
      this.cityName = form.value.city;
      this.hourlyTempList = [];
      this.getWeatherData();
      form.reset();
    }
  }
}
