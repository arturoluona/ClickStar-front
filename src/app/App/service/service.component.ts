import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ServiceService } from './service.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';




@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public form: FormGroup;
  public items = <any>[];
  public search = '';
  
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

    private rest: RestService,    
    public RegistrarService: ServiceService,
    private builder: FormBuilder,
    private modalService: BsModalService,

  ) { }
  
  ngOnInit(): void {
    this.load(false);
    this.form = this.builder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      proveedor: ['',],
      description: ['',],
    })
    
  }

  openModal (template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.disableButton = true;
  }

  submit(){
    this.rest.post('services', this.form.value).subscribe(() => {
      this.modalRef.hide()
    })
  }
  openModalData (template: TemplateRef<any>,data){
    this.form.patchValue(data);
    this.form.disable();
    this.disableButton = false
    this.modalRef = this.modalService.show(template);
  }

  load(a: any) {
    const query = (a) ? `filter=${a}&fields=name,type` : ''
    this.rest.get(`services?${query}`).subscribe( data => {
      
    this.items = [];
      console.log(data);
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }
  
}
