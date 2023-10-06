import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAir } from '../interfaces/air';
import { Coord } from '../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class AirService {
  private apiUrl = 'http://api.openweathermap.org/data/2.5/air_pollution?';
  private apiKey = '&appid=63c3dade8bd2d079127c503a20b039d1';

  constructor(private http: HttpClient) {}

  getAir(coord: Coord): Observable<IAir> {
    return this.http.get<IAir>(
      `${this.apiUrl}lat=${coord.lat}&lon=${coord.lon}${this.apiKey}`
    );
  }
}
