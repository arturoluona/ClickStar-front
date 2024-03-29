import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public id: string;
  public user: any;
  public form: FormGroup;
  public items = [] as any;
  public search = '';
  isDeleted = false;

  public typeDevices = [
    { value: 'laptop', name: 'laptop'},
    { value: 'cpu', name: 'cpu'},
    { value: 'impresora', name: 'Impresora'},
    { value: 'modem/router', name: 'Router/Modem'},
    { value: 'monitor', name: 'Monitor'},
    { value: 'otros', name: 'Otros'}
  ];
    modalRef: BsModalRef;
    disableButton = true;

  constructor(
    private cookieService: CookieService,
    private rest: RestService,
    private builder: FormBuilder,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.rest.checkSession(false, false).then((a) => {
      this.user =  JSON.parse(this.cookieService.get('user'));
    }).catch((e) => this.user = {role: false});
    this.form = this.builder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      proveedor: ['', ],
      description: ['', ],
    });
    this.load(false);

  }

  openModal(template: TemplateRef<any>){
    this.id = null;
    this.form.reset();
    this.modalRef = this.modalService.show(template);
    this.disableButton = true;
  }

  submit(){
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`services${(this.id) ? '/' + this.id : ''}`, this.form.value).subscribe(() => {
      this.modalRef.hide();
      this.load(false);
    });
  }
  openModalData(template: TemplateRef<any>, data){
    this.id = data._id;
    this.form.patchValue(data);
    if (this.user.role !== 'admin') {
      this.disableButton = false;
      this.form.disable();
    }
    this.modalRef = this.modalService.show(template);
  }

  load(a: any) {
    if (this.isDeleted) { this.deletedLoad(a); }
    else {
      Object.keys(this.form.controls).forEach(ctrl => this.form.controls[ctrl].enable());
      const query = (a) ? `filter=${a}&fields=name,type` : '';
      this.rest.get(`services?${query}`).subscribe( data => {
        this.items = [];
        data.docs.map(a => {
          this.items.push(a);
        });
      });
    }
  }

  deletedLoad = (a = '') => {
    if (this.user.role === 'admin') {
      if (this.isDeleted) {
        Object.keys(this.form.controls).forEach(ctrl => this.form.controls[ctrl].disable());
        const query = (a) ? `filter=${a}&fields=name,type` : '';
        this.rest.get(`services/deletedAll?${query}`).subscribe( (data: any) => {
          this.items = [];
          this.items = data;
        });
      } else {
        this.load('');
      }
    }
  }

  delete() {
    this.rest.alertDelete('services', this.id).then(() => {
      this.load(false);
      this.modalRef.hide();
    });
  }

  restored = () => {
    this.rest.get(`services/restore/${this.id}`).subscribe(() => {
      this.id = null;
      this.modalRef.hide();
      this.deletedLoad('');
    });
  }
}
