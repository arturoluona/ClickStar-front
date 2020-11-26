import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  
  public ram: FormGroup;
  public hdd: FormGroup;
  public pc: FormGroup;
  
  public ramList = <any>[];
  public hddList = <any>[];
  public dataDevice = <any>{};

  constructor(
    private builder: FormBuilder,
    private rest: RestService,    
    public bsModalRef: BsModalRef
    ) {
    this.ram = this.builder.group({
      version: ['', Validators.required],
      capacity: ['', Validators.required],
      serial: ['', Validators.required],
    });

    this.hdd = this.builder.group({      
      model: ['', Validators.required],
      capacity: ['', Validators.required],
      serial: ['', Validators.required],
    });
    this.formPc();
   }

  ngOnInit(): void {
  }

  public formPc() {
    this.pc = this.builder.group({
      model: ['', Validators.required],
      make: ['', Validators.required],
      type: ['', Validators.required],
      serial: ['', Validators.required],
      proCache: [''],
      proModel: [''],
      proMake: [''],
      proSerial: [''],
      loader: [''],
      battery: [''],
      description: ['']
    });
  }

  submitRam() {
    this.ramList.push(this.ram.value);
  }
  deleteRam(id) {
    this.ramList.splice(id, 1);
  }

  submitHdd() {
    this.hddList.push(this.hdd.value);
  }
  deleteHdd(id) {
  this.hddList.splice(id, 1);
  }
  submit() {
    const send = {
      model: this.pc.value.model,
      make: this.pc.value.make,
      type: this.pc.value.type,
      serial: this.pc.value.serial,
      ram: this.ramList,
      hdd: this.hddList,
      processor: {
        cache: this.pc.value.proCache,
        model: this.pc.value.proModel,
        make: this.pc.value.proMake,
        serial: this.pc.value.proSerial
      },
      loader: this.pc.value.loader,
      battery: this.pc.value.battery,
      description: this.pc.value.description
    }
    this.rest.post('devicePc', send).subscribe(() => {
      this.close()
    })
  }  
  
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }

}
