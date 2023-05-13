import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FlightDataService } from '../flight-data.service';
export interface TableData {
  departureAirport: string;
  arrivalAirport: string;
  time: string;
  ariving: number;
  departing: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  FLIGHT_DATA: TableData[] = [];

  depPorts: any = [];
  arrPorts: any = [];
  currentTime = Math.floor(Date.now() / 1000);
  dayStart = this.currentTime - 7200;

  displayedColumns: string[] = ['Airport', 'Time', 'Ariving', 'Departing'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  mobileQuery: MediaQueryList;

  fillerNav = [
    'Schedule Flight',
    'Flight History',
    'Geotag Flight',
    'settings',
    'log out',
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private service: FlightDataService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.service.getFlights().subscribe((response) => {
      const data: any = response;
      console.log(data);

      data.forEach((flightData: any) => {
        flightData.estDepartureAirport &&
          this.depPorts.push(flightData.estDepartureAirport);
      });
      data.forEach((flightData: any) => {
        flightData.estDepartureAirport &&
          this.arrPorts.push(flightData.estDepartureAirport);
      });

      data.forEach((flightData: any) => {
        function getOccurrence(array: [], value: any) {
          return array.filter((v: any) => v === value).length;
        }
        function getFormattedDate(param: number) {
          const milliseconds = param * 1000; // 1575909015000
          4;
          const dateObject = new Date(milliseconds);

          // Will display time in 10:30:23 format
          var formattedTime = dateObject.toLocaleTimeString('en-NG', {
            timeZoneName: 'short',
          });

          return formattedTime;
        }
        flightData.estDepartureAirport &&
          this.FLIGHT_DATA.push({
            departureAirport: flightData.estDepartureAirport,
            arrivalAirport: flightData.estArrivalAirport,
            time: getFormattedDate(flightData.firstSeen),
            ariving: getOccurrence(this.arrPorts, flightData.estArrivalAirport),
            departing: getOccurrence(
              this.depPorts,
              flightData.estDepartureAirport
            ),
          });
        this.dataSource = new MatTableDataSource<TableData>(this.FLIGHT_DATA);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
