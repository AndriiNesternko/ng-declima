import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather';
import { Coord, IAir } from '../interfaces/air';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private apiAirUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<IWeather> {
    return this.http.get<IWeather>(
      `${this.apiWeatherUrl}${city}${environment.apiKey}&units=metric&cnt=5`
    );
  }

  getAir(coord: Coord): Observable<IAir> {
    return this.http.get<IAir>(
      `${this.apiAirUrl}lat=${coord.lat}&lon=${coord.lon}${environment.apiKey}`
    );
  }
}
