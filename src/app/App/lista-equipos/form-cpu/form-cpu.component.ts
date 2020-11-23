import { Component, OnInit } from '@angular/core';
import { FormCpuService } from './form-cpu.service';

@Component({
  selector: 'app-form-cpu',
  templateUrl: './form-cpu.component.html',
  styleUrls: ['./form-cpu.component.css']
})
export class FormCpuComponent implements OnInit {

  constructor(

    public formCpu: FormCpuService

  ) { }

  ngOnInit(): void {
  }

  openModal(data = <any>{}) { 
    this.formCpu.openOrder(data)
  }

}
