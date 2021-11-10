import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public user: any;
  public form: FormGroup;
  public items = [] as any;
  item: any;
  files: File[] = [];
  public search = '';
  public stock: number;
  public valorMaximo = 0 as number;
  public valueStock = 0 as number;
  public id: string;
  modalRef: BsModalRef;

  constructor(
    private builder: FormBuilder,
    private modalService: BsModalService,
    private rest: RestService,
    private cookieService: CookieService,

  ) { }

  ngOnInit(): void {
    this.load(false),
    this.form = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      proveedor: ['', ],
      description: ['', ],
  });
    this.user =  JSON.parse(this.cookieService.get('user'));
  }

  openModal(template: TemplateRef<any>){
    this.id = null;
    this.form.reset();
    this.form.enable();
    this.valorMaximo = 0;
    this.valueStock = 0;
    this.modalRef = this.modalService.show(template);
  }

  submit = async () => {
    const send = {
      ...this.form.value,
      stock: this.stock
    };
    const method = (this.valorMaximo) ? 'patch' : 'post';
    if (this.files.length) { send.storage = await this.onSubmitStorage(); }
    this.rest[method](`inventory${(method === 'patch') ? `/${this.id}` : ''}`, send).subscribe(() => {
      this.modalRef.hide();
      this.valorMaximo = 0;
      this.valueStock = 0;
      this.item = {};
      this.onRemove();
      this.form.reset();
      this.form.enable();
      this.load(false);
    });
  }

  openModalData(template: TemplateRef<any>, data){
    console.log(data)
    this.id = data._id;
    this.form.patchValue(data);
    this.item = data;
    if (this.user.role !== 'admin') { this.form.disable(); }
    this.valorMaximo = data.stock;
    this.valueStock =  data.stock;
    this.stock = data.stock;
    this.modalRef = this.modalService.show(template);
  }

  cambioStock(event) {
    this.stock = event;
  }

  load(a: any) {

    const query = (a) ? `filter=${a}&fields=name` : '';
    this.rest.get(`inventory?${query}`).subscribe( data => {
       this.items = [];
       data.docs.map(a => {
        this.items.push(a);
      });
    });
  }

  delete() {
    this.rest.alertDelete('inventory', this.id).then(() => {
      this.load(false);
      this.modalRef.hide();
    });
  }

  onSubmitStorage = () => new Promise((resolve, reject) => {
    const formData = new FormData();
    this.files.forEach((item: any) => formData.append('files[]', item));
    this.rest.post('storages', formData, {}).subscribe((a: any) => {
        resolve(a);
      }, (e: any) => {
        reject(e);
      }
    );
  })
  onSelect = (event: any) => {
    this.files = [];
    this.files.push(...event.addedFiles);
  }
  onRemove = () => this.files = [];
}
