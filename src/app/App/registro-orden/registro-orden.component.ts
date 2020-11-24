import { Component, OnInit, ViewChild } from '@angular/core';
import {RestService} from '../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {concat, Observable, of, Subject} from "rxjs";
import {catchError, distinctUntilChanged, finalize, map, switchMap, tap} from "rxjs/operators";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ClienteComponent} from './modals/cliente/cliente.component';
import {PcComponent} from './modals/pc/pc.component';

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

  public typeDevices = [
    { id: 'devicePc', name: 'PC'},
    { id: 'devicePrinter', name: 'Impresora'},
    { id: 'deviceRouter', name: 'Router/Modem'},
    { id: 'deviceMonitor', name: 'Monitor'},
    { id: 'deviceOthers', name: 'Otros'}
  ]
  
  bsModalRef: BsModalRef;

  public formOrden: FormGroup;
  // USER
  results$: Observable<any>;  
  @ViewChild('selectUserInput') selectUserInput;
  userLoading = false;
  userInput$ = new Subject<string>();

  // DEVICE
  device$: Observable<any>;  
  @ViewChild('selectDeviceInput') selectDeviceInput;
  deviceLoading = false;
  deviceInput$ = new Subject<string>();  

  selectedDevice: any; // escoger equipo

  constructor(
    private builder: FormBuilder,
    private rest: RestService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.formOrden = this.builder.group({
      user: ['', Validators.required],
      device: ['', Validators.required],
      description: ['', Validators.required],
    });

    
    this.loadUsers()
    this.loadDevices()
    // this.formRouter();
  }

  // USERS
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
        this.bsModalRef = this.modalService.show(
          ClienteComponent
        );
      } else {
        this.formOrden.patchValue({user: e})
      }
    }
  }

  trackByFn(item: any) {
    return item._id;
  }

  // FIN USERS

  // DEVICES
  private loadDevices() {
    this.device$ = concat(
      of([]), // default items
      this.deviceInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.deviceLoading = true),
        switchMap(term => this.singleSearchDevice$(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.deviceLoading = false)
        ))
      )
    );
  }
  singleSearchDevice$ = (term) => {
    const q = [
      `${this.selectedDevice.id}?`,
      `filter=${term}`,
      `&fields=model,make,serial`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];
    return this.rest.get(q.join('')).pipe(
      map((a) => a.docs)
    )
  }

  selectDevices = (e) => {
    let component: any;
    if (this.selectedDevice.id === 'devicePc') component = PcComponent;
    if (this.selectedDevice.id === 'devicePrinter') component = '';
    if (this.selectedDevice.id === 'deviceRouter') component = '';
    if (this.selectedDevice.id === 'deviceMonitor') component = '';
    if (this.selectedDevice.id === 'deviceOthers') component = '';

    if (e) {
      if (!e._id) {
        this.bsModalRef = this.modalService.show(
          component
        );
      } else {
        this.formOrden.patchValue({device: e})
        console.log(this.formOrden.value)
      }
    }
  }

  // FIN DEVICES

  

  submit() {
    const data = {

    }
  }
}
