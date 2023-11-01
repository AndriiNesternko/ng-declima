import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather';
import { Coord, IAir } from '../interfaces/air';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private apiAirUrl = 'http://api.openweathermap.org/data/2.5/air_pollution?';
  private apiKey = '&appid=63c3dade8bd2d079127c503a20b039d1';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<IWeather> {
    return this.http.get<IWeather>(
      `${this.apiWeatherUrl}${city}${this.apiKey}&units=metric&cnt=5`
    );
  }

  getAir(coord: Coord): Observable<IAir> {
    return this.http.get<IAir>(
      `${this.apiAirUrl}lat=${coord.lat}&lon=${coord.lon}${this.apiKey}`
    );
  }
}
