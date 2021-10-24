import { Component, OnInit, ViewChild } from '@angular/core';
import {RestService} from '../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, distinctUntilChanged, finalize, map, switchMap, tap} from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ClienteComponent} from './modals/cliente/cliente.component';
import {PcComponent} from './modals/pc/pc.component';
import { ImpresoraComponent } from './modals/impresora/impresora.component';
import { MonitorComponent } from './modals/monitor/monitor.component';
import { RouterComponent } from './modals/router/router.component';
import { OtrosComponent } from './modals/otros/otros.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  options = new JsonEditorOptions();

  public id: string;
  public dataOrden: any;

  public typeDevices = [
    { value: 'devicePc', name: 'PC'},
    { value: 'devicePrinter', name: 'Impresora'},
    { value: 'deviceRouter', name: 'Router/Modem'},
    { value: 'deviceMonitor', name: 'Monitor'},
    { value: 'deviceOthers', name: 'Otros'}
  ];

  public user: any;
  public status = [
    {value: 'wait', name: 'Espera'},
    {value: 'process', name: 'Proceso'},
    {value: 'completed', name: 'Completado'},
    {value: 'delivered', name: 'Entregado'},
    {value: 'cancelado', name: 'Cancelado'}
  ];

  bsModalRef: BsModalRef;

  public formOrden: FormGroup;

  public tecnicos$: Observable<any[]>;
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
    private modalService: BsModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService, ) {
       this.options.mode = 'code';
       this.options.modes = ['code', 'text', 'tree', 'view'];
       this.options.statusBar = false;
    }

  ngOnInit(): void {
    this.formOrden = this.builder.group({
      customer: ['', Validators.required],
      tecnico: ['', Validators.required],
      device: [''],
      deviceJson: [''],
      description: [''],
      price: [''],
      status: ['', Validators.required],
    });
    this.user =  JSON.parse(this.cookieService.get('user'));

    if (this.user.role === 'tecnico' || this.user.role === 'user') { this.formOrden.disable(); }
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
    });

    if (this.id) {
      this.loadOrden();
    }

    this.loadUsers();
    this.loadDevices();
    this.loadTecnico();
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
      `users/customers?`,
      `filter=${term}`,
      `&fields=name,email,ci,phone`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];
    return this.rest.get(q.join('')).pipe(
      map((a: any) => a.docs)
    );
  }

  selectUser = (e) => {
    if (e) {
      if (!e._id) {
        this.bsModalRef = this.modalService.show(
          ClienteComponent
        );
      } else {
        this.formOrden.patchValue({customer: e});
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
      `${this.selectedDevice.value}?`,
      `filter=${term}`,
      `&fields=model,make,serial`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];
    return this.rest.get(q.join('')).pipe(
      map((a: any) => a.docs)
    );
  }

  selectDevices = (e) => {
    let component: any;
    if (this.selectedDevice.value === 'devicePc') { component = PcComponent; }
    if (this.selectedDevice.value === 'devicePrinter') { component = ImpresoraComponent; }
    if (this.selectedDevice.value === 'deviceRouter') { component = RouterComponent; }
    if (this.selectedDevice.value === 'deviceMonitor') { component = MonitorComponent; }
    if (this.selectedDevice.value === 'deviceOthers') { component = OtrosComponent; }

    if (e) {
      if (!e._id) {
        this.bsModalRef = this.modalService.show(
          component
        );
      } else {
      }
    }
  }
  // FIN DEVICES


  loadTecnico() {
    const q = [
      `users?`,
      `filter=tecnico`,
      `&fields=role`,
      `&page=1&limit=100`,
      `&sort=name&order=-1`,
    ];
    this.tecnicos$ = this.rest.get(q.join('')).pipe(
      map((a: any) => a.docs)
    );
  }

  loadOrden() {
    this.rest.get(`orden/${this.id}`).subscribe( data => {
      this.dataOrden = data;
      delete data?.device?.label?._id;
      delete data?.device?.label?.createdAt;
      delete data?.device?.label?.updatedAt;
      this.selectedDevice = this.dataOrden.typeDevice;
      this.formOrden.patchValue({
        customer: data.customer[0],
        tecnico:  data.tecnico[0],
        deviceJson: data.device.label,
        description: data.description,
        price: data.price,
        status: data.status
      });
      console.log(this.formOrden);
    });
  }

  submit() {
    const method = (this.id) ? 'patch' : 'post';
    const send = {
      customer: this.formOrden.value.customer._id,
      tecnico: this.formOrden.value.tecnico._id,
      price: (this.formOrden.value.price) ? this.formOrden.value.price : 0,
      description: this.formOrden.value.description,
      device: (method === 'patch') ? this.formOrden.value.deviceJson : this.formOrden.value.device,
      status: this.formOrden.value.status,
      typeDevice: this.selectedDevice
    };
    this.rest[method](`orden${(this.id) ? '/' + this.id : ''}`, send).subscribe(() => {
      if (method === 'patch') {
        this.rest.patch(`${this.dataOrden.typeDevice.value}/${this.dataOrden.device?._id}`, send.device).subscribe(() => {
          this.router.navigate(['/', 'lista-o']);
        });
      } else {
        this.router.navigate(['/', 'lista-o']);
      }
    });
  }

  delete() {
    this.rest.alertDelete('orden', this.id).then(() => {
      this.router.navigate(['/', 'lista-o']);
    });
  }

  public redirect() {
    window.open(`http://localhost:3000/pdf/orden/${this.id}`, '_blank');
  }
}
