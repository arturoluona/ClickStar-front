import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public totalDevices = <number>0;
  public customers = <number>0;
  public deviceCalc = <any>[];
  public ordenCalc = <any>[];
  public deviceLabels = <any>[];
  public ordenLabels = <any>[];
  public callsHttpDevice = [];
  public callsHttpOrden = [];
  public login = <any>false;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit(): void {
    this.rest.checkSession(false, false).then(() => {
      this.login = true
      this.loadDevices();
      this.loadCustomers();
      this.loadOrdenes();
    }).catch(e => this.login = false)
  }

  public requestMultipleDataDevices(): Observable<any> {
    this.callsHttpDevice = []
    this.callsHttpDevice.push(this.rest.get(`devicePc`).pipe(map(a => a.totalDocs)));
    this.callsHttpDevice.push(this.rest.get('deviceMonitor').pipe(map(a => a.totalDocs)));  
    this.callsHttpDevice.push(this.rest.get('deviceOthers').pipe(map(a => a.totalDocs)));
    this.callsHttpDevice.push(this.rest.get('devicePrinter').pipe(map(a => a.totalDocs)));
    this.callsHttpDevice.push(this.rest.get('deviceRouter').pipe(map(a => a.totalDocs)));

    return forkJoin(this.callsHttpDevice);
  }

  loadDevices() {
    this.deviceLabels = [
      'Pc',
      'Monitor',
      'Otros',
      'Impresora',
      'Router/modem'
    ];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    this.requestMultipleDataDevices().subscribe((list) => {
      this.deviceCalc[0] = list[0];
      this.deviceCalc[1] = list[1];
      this.deviceCalc[2] = list[2];
      this.deviceCalc[3] = list[3];
      this.deviceCalc[4] = list[4];
      this.totalDevices = this.deviceCalc.reduce(reducer);
    });    
  }

  loadCustomers() {
    this.rest.get('users/customers').subscribe(a => this.customers = a.totalDocs)
  }

  public requestMultipleDataOrdenes(): Observable<any> {
    this.callsHttpOrden = []
    this.callsHttpOrden.push(this.rest.get(`orden?filter=wait&fields=status`).pipe(map(a => a.totalDocs)));
    this.callsHttpOrden.push(this.rest.get('orden?filter=process&fields=status').pipe(map(a => a.totalDocs)));  
    this.callsHttpOrden.push(this.rest.get('orden?filter=completed&fields=status').pipe(map(a => a.totalDocs)));
    this.callsHttpOrden.push(this.rest.get('orden?filter=delivered&fields=status').pipe(map(a => a.totalDocs)));
    this.callsHttpOrden.push(this.rest.get('orden?filter=cancelado&fields=status').pipe(map(a => a.totalDocs)));

    return forkJoin(this.callsHttpOrden);
  }

  loadOrdenes() {
    this.ordenLabels = [
      'Espera',
      'Proceso',
      'Completado',
      'Entregado',
      'Cancelado'
    ];

    this.requestMultipleDataOrdenes().subscribe((list) => {
      this.ordenCalc[0] = list[0];
      this.ordenCalc[1] = list[1];
      this.ordenCalc[2] = list[2];
      this.ordenCalc[3] = list[3];
      this.ordenCalc[4] = list[4];
    });    
  }

}
