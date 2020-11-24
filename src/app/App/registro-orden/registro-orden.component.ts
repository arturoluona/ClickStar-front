import { Component, OnInit, ViewChild } from '@angular/core';
import {RestService} from '../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {concat, Observable, of, Subject} from "rxjs";
import {catchError, distinctUntilChanged, finalize, map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

  public formOrden: FormGroup;
  results$: Observable<any>;  
  @ViewChild('selectUserInput') selectUserInput;
  userLoading = false;
  userInput$ = new Subject<string>();

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
    this.formOrden = this.builder.group({
      user: ['', Validators.required],
      device: ['', Validators.required],
      description: ['', Validators.required],
    });

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
    this.loadUsers()

    // this.formRouter();
  }

  private loadUsers() {
    this.results$ = concat(
      of([]), // default items
      this.userInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.userLoading = true),
        switchMap(term => this.singleSearchUser$(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.userLoading = false)
        ))
      )
    );
  }
  singleSearchUser$ = (term) => {
    const q = [
      `users?`,
      `filter=${term}`,
      `&fields=name,email,ci,phone`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];
    return this.rest.get(q.join('')).pipe(
      map((a) => a.docs)
    )
  }

  selectUser = (e) => {
    if (e) {
      if (!e._id) {
        const initialData = {...e, ...{manager: null, role: 'user'}}
      } else {
        this.formOrden.patchValue({user: e})
        console.log(this.formOrden.value)
      }
    }
  }

  trackByFn(item: any) {
    return item._id;
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
