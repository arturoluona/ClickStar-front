import { Component, OnInit } from '@angular/core';
import { FormLaptopService } from './form-laptop.service';

@Component({
  selector: 'app-form-laptop',
  templateUrl: './form-laptop.component.html',
  styleUrls: ['./form-laptop.component.css']
})
export class FormLaptopComponent implements OnInit {

  constructor(

    public formLaptop : FormLaptopService

  ) { }

  ngOnInit(): void {
  }

  openModal(data = <any>{}) { 
    this.formLaptop.openOrder(data)
  }

}
