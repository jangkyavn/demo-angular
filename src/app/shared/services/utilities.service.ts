import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private modalService: NzModalService) { }

  showDeleteConfirm(message: string, okCallBack: () => any) {
    this.modalService.confirm({
      nzTitle: 'Inform',
      nzContent: message,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkType: 'danger',
      nzOnOk: () => {
        okCallBack();
      }
    });
  }
}
