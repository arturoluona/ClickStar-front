import { Component, OnInit } from '@angular/core';
import { FormOthersService } from './form-others.service';

@Component({
  selector: 'app-form-others',
  templateUrl: './form-others.component.html',
  styleUrls: ['./form-others.component.css']
})
export class FormOthersComponent implements OnInit {

  constructor(
    public formOthers: FormOthersService
  ) { }

  ngOnInit(): void {
  }
  openModal(data = <any>{}) { 
    this.formOthers.openOrder(data)
  }
}
