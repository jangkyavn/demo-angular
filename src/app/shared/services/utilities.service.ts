import { Injectable } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService
    ) { }

  success(message: string) {
    this.message.remove();
    this.message.success(message);
  }

  error(message: string) {
    this.message.remove();
    this.message.error(message);
  }

  warning(message: string) {
    this.message.remove();
    this.message.warning(message);
  }

  info(message: string) {
    this.message.remove();
    this.message.info(message);
  }

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
