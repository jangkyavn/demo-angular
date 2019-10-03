import { Component, OnInit, HostListener } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { Customer } from '@model/customer.model';
import { PagingParams } from '@model/paging-params.model';
import { CustomersService } from '@service/customers.service';
import { UtilitiesService } from '@service/utilities.service';

import { UserAddEditModalComponent } from './user-add-edit-modal/user-add-edit-modal.component';
import { PagedResult } from '@model/paged-result.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  loading: boolean;
  pagedResult: PagedResult<Customer> = {};
  sortValue: string | null = null;
  sortKey: string | null = null;
  pagingParams: PagingParams = {
    keyword: ''
  };
  filterGender = [{ text: 'male', value: true }, { text: 'female', value: false }];
  searchGenderList: string[] = [];

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if ($event.key === 'Insert') {
      this.addNew();
    }
  }

  constructor(
    private modalService: NzModalService,
    private customersService: CustomersService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.searchData();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  updateFilter(value: any): void {
    this.pagingParams.filterGender = value;
    this.searchData(true);
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pagedResult.currentPage = 1;
    }
    this.loading = true;
    this.customersService.getAllPaging(this.pagedResult.currentPage, this.pagedResult.pageSize, this.pagingParams)
      .subscribe((data: PagedResult<Customer>) => {
        this.loading = false;
        this.pagedResult = data;

        if (data.items.length === 0 && this.pagedResult.currentPage > 1) {
          this.pagedResult.currentPage -= 1;
          this.searchData();
        }
      }, error => {
        console.log('Error load customers', error);
        this.utilitiesService.error('Failure');
      });
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
        this.searchData();
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
        this.searchData();
        modal.destroy();
      } else {
        modal.destroy();
      }
    });
  }

  delete(data: any) {
    this.utilitiesService.showDeleteConfirm('Do you want to delete this?', () => {
      this.customersService.delete(data).subscribe(() => {
        this.searchData();
      });
    });
  }
}
