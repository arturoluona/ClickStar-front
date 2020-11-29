import { Component, OnInit, TemplateRef } from '@angular/core';
import { InventoryService } from './inventory.service';
import { RestService } from 'src/app/rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  public form: FormGroup;
  public items = <any>[];
  public search = '';
  public stock: number;
  public valorMaximo = <number>0;
  public valueStock = <number>0;
  public id: string;
  modalRef: BsModalRef;

  constructor(
    private builder: FormBuilder,
    private modalService: BsModalService,
    public inventory: InventoryService,
    private rest: RestService,
    
  ) { }

  ngOnInit(): void {
    this.load(false),
    this.form = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      proveedor: ['',],
      description: ['',],
  })
  }

  openModal (template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  submit(){
    const send = {
      ...this.form.value,
      stock: this.stock
    }
    const method = (this.valorMaximo) ? 'patch' : 'post'

    this.rest[method](`inventory${(method === 'patch') ? `/${this.id}` : ''}`, send).subscribe(() => {
      this.modalRef.hide();
      this.form.reset();
      this.form.enable();
      this.load(false);
    })
  }

  openModalData (template: TemplateRef<any>, data){
    this.id = data._id;
    this.form.patchValue(data);
    this.form.disable();
    this.valorMaximo = data.stock;
    this.valueStock =  data.stock;
    console.log(this.valorMaximo)
    this.modalRef = this.modalService.show(template);
  }

  cambioStock(event) {
    this.stock = event
  }

  load(a: any) {
 
    const query = (a) ? `filter=${a}&fields=name` : ''
    this.rest.get(`inventory?${query}`).subscribe( data => {
       this.items = []
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }
}