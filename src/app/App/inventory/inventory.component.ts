import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    public inventory: InventoryService
  ) { }

  ngOnInit(): void {
  }
  openModal(data = <any>{}) {
    this.inventory.openOrder(data)
  }

}
