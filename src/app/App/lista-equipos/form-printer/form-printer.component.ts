import { Component, OnInit } from '@angular/core';
import { FormPrinterService } from './form-printer.service';

@Component({
  selector: 'app-form-printer',
  templateUrl: './form-printer.component.html',
  styleUrls: ['./form-printer.component.css']
})
export class FormPrinterComponent implements OnInit {

  constructor(

    public formPrinter: FormPrinterService

  ) { }

  ngOnInit(): void {
  }

  openModal(data = <any>{}) { 
    this.formPrinter.openOrder(data)
  }

}
