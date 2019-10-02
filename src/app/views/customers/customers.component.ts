import { Component, OnInit } from '@angular/core';

import { CustomersService } from '@service/customers.service';
import { Customer } from '@model/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.customersService.getHeroes().subscribe(data => this.customers = data);
  }
}
