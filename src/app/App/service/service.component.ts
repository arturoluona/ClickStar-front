import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public agg= <any>[]

    cop=0.007;
    rpta=<number>0;
    precio=<number>10000;

    Operacion (){
      this.rpta=this.precio*this.cop

     
    }

  constructor(

    public RegistrarService: ServiceService

  ) { 

    this.agg=[{
      servicio:"Mantenimiento Preventivo Software /Mantenimiento Preventivo Software",
      equipo:"CPU",
      rpta:"",
    },
    {

      servicio:"Mantenimiento Preventivo Software",
      equipo:"CPU",
      precio:"250000",
    },
    {

      servicio:"S/o + Programas Basicos",
      equipo:"Laptop",
      precio:"50.000",
    },
    {

      servicio:"Mantenimiento Preventivo Hardware",
      equipo:"Modem",
      precio:"150.000",
    },
    {

      servicio:"Mantenimiento Correctivo Hardware",
      equipo:"Monitor",
      precio:"450.000",
    },
  

  ]

  }

  ngOnInit(): void {
  }
openModal (){
  this.RegistrarService.openOrder()
}
  
}
