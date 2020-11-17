import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

  public formulario = <string>''

  constructor() { }

  ngOnInit(): void {
  }
 onChange (value){
   this.formulario=value

 }
}
