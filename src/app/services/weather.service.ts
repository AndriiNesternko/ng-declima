import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private apiKey = '&appid=63c3dade8bd2d079127c503a20b039d1';
  // https://api.openweathermap.org/data/2.5/forecast?q=kyiv&appid=63c3dade8bd2d079127c503a20b039d1&units=metric&cnt=5

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<IWeather> {
    return this.http.get<IWeather>(
      `${this.apiUrl}${city}${this.apiKey}&units=metric&cnt=5`
    );
  }
}
