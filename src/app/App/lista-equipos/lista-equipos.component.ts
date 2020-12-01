import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.component.html',
  styleUrls: ['./lista-equipos.component.css']
})
export class ListaEquiposComponent implements OnInit {

  public user: any;
  public items= <any>[];

  public typeDevices = [
    { value: 'devicePc', name: 'PC'},
    { value: 'devicePrinter', name: 'Impresora'},
    { value: 'deviceRouter', name: 'Router/Modem'},
    { value: 'deviceMonitor', name: 'Monitor'},
    { value: 'deviceOthers', name: 'Otros'}
  ]
  selectedDevice: any;

  public search = '';
  constructor(
    private cookieService: CookieService,
    private rest: RestService
    ) {}
    

  ngOnInit(): void {
    this.user =  JSON.parse(this.cookieService.get('user'));
  }
  
  load(a: any) {
    this.items = []
    const query = (a) ? `filter=${a}&fields=make,model,serial` : '';
    this.rest.get(`${this.selectedDevice.value}?${query}`).subscribe( data => {
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }

  
  redireccion(id) {
    window.open(`http://localhost:3000/pdf/${this.selectedDevice.value}/${id}`, '_blank');
  }

  selectDevices(device) {
    this.selectedDevice = device;
    this.load(false);
  }

  delete(id) {
    this.rest.alertDelete(this.selectedDevice.value, id).then(() => {
      this.load(false);
    })
  }
}
