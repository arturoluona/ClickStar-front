import { Component, OnInit } from '@angular/core';
import { FormRouterService } from './form-router.service';

@Component({
  selector: 'app-form-router',
  templateUrl: './form-router.component.html',
  styleUrls: ['./form-router.component.css']
})
export class FormRouterComponent implements OnInit {

  public data = <any>{}

  constructor(
    public formRouter: FormRouterService

  ) { }

  ngOnInit(): void {
  }
  openModal(data = <any>{}) { 
    this.formRouter.openOrder(data)
  }
}
