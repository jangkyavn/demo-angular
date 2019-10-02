import { Component, OnInit } from '@angular/core';

import { Customer } from '@model/customer.model';
import { CustomersService } from '@service/customers.service';
import { UtilitiesService } from '@service/utilities.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(
    private customersService: CustomersService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.customersService.getAll().subscribe(data => this.customers = data);
  }

  addNew() {
    //
  }

  edit() {
    ///
  }

  delete(data: any) {
    this.utilitiesService.showDeleteConfirm('Do you want to delete this?', () => {
      this.customersService.delete(data).subscribe(() => {
        this.loadData();
      });
    });
  }
}
