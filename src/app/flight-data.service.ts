import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  currentTime = Math.floor(Date.now() / 1000);
  dayStart = this.currentTime - 7200;
  private url = `https://opensky-network.org/api/flights/all?begin=${this.dayStart}&end=${this.currentTime}`;

  constructor(private httpClient: HttpClient) {}

  getFlights() {
    return this.httpClient.get(this.url);
  }
}
