import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { Customer } from '@model/customer.model';
import { CustomersService } from '@service/customers.service';
import { UtilitiesService } from '@service/utilities.service';

import { UserAddEditModalComponent } from './user-add-edit-modal/user-add-edit-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(
    private modalService: NzModalService,
    private customersService: CustomersService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.customersService.getAll().subscribe(data => this.customers = data);
  }

  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Add new customer',
      nzContent: UserAddEditModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        isAddNew: true,
        customer: {
          id: 0
        }
      },
      nzFooter: [
        {
          label: 'Cancel',
          shape: 'default',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.saveChanges();
          }
        }
      ]
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        modal.destroy();
      } else {
        modal.destroy();
      }
    });
  }

  edit(data: any) {
    const modal = this.modalService.create({
      nzTitle: 'Edit customer',
      nzContent: UserAddEditModalComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        isAddNew: false,
        customer: data
      },
      nzFooter: [
        {
          label: 'Cancel',
          shape: 'default',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Save',
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance.saveChanges();
          }
        }
      ]
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        modal.destroy();
      } else {
        modal.destroy();
      }
    });
  }

  delete(data: any) {
    this.utilitiesService.showDeleteConfirm('Do you want to delete this?', () => {
      this.customersService.delete(data).subscribe(() => {
        this.loadData();
      });
    });
  }
}
