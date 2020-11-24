import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

  public formulario = <string>''
  public ram: FormGroup;
  public hdd: FormGroup;
  public pc: FormGroup;
  public router: FormGroup;
  public monitor: FormGroup;
  public impresora: FormGroup;
  public otros: FormGroup;
  
  public ramList = <any>[];
  public hddList = <any>[];
  public dataDevice = <any>{};

  constructor(
    private builder: FormBuilder,
    private rest: RestService,) { }

  ngOnInit(): void {
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

    // this.formRouter();
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

  onChange (value){
    this.formulario = value

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
    const data = {

    }
  }

//   parseDevice() {
//     this.dataDevice = {}
//     switch (this.formulario) {
//       case 'pc':
//         this.dataDevice = {
//           model
// make
// type
// serial
// ram
// hdd
// processor
// loader
// battery
// description
//         }
//         break;
    
//       default:
//         break;
//     }
//   }
}
