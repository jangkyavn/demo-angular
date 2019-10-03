import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';

import { Customer } from '@model/customer.model';
import { CustomersService } from '@service/customers.service';
import { UtilitiesService } from '@service/utilities.service';

@Component({
  selector: 'app-user-add-edit-modal',
  templateUrl: './user-add-edit-modal.component.html',
  styleUrls: ['./user-add-edit-modal.component.css']
})
export class UserAddEditModalComponent implements OnInit {
  @Input() customer: Customer;
  @Input() isAddNew: boolean;
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private customersService: CustomersService,
    private utilitiesService: UtilitiesService
  ) { }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if ($event.ctrlKey && $event.key === 'Enter') {
      this.saveChanges();
    }
  }

  ngOnInit() {
    this.createForm();
    this.customerForm.reset();
    this.customerForm.patchValue(this.customer);
  }

  createForm() {
    this.customerForm = this.fb.group({
      id: [0],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, [Validators.required]],
      birthDay: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: [null]
    });
  }

  saveChanges() {
    if (this.customerForm.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.customerForm.controls) {
        this.customerForm.controls[i].markAsDirty();
        this.customerForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    const data = this.customerForm.value;
    if (this.isAddNew) {
      this.customersService.add(data).subscribe((res: any) => {
        if (res != null) {
          this.utilitiesService.success('Successfully');
          this.modal.destroy(true);
        } else {
          this.utilitiesService.error('Failure');
        }
      });
    } else {
      this.customersService.update(data).subscribe((res: any) => {
        this.utilitiesService.success('Successfully');
        this.modal.destroy(true);
      }, error => {
        console.log('Edit fail customer');
        this.utilitiesService.error('Failure');
      });
    }
  }
}
