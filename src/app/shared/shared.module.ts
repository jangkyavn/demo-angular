import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    imports: [CommonModule, NgZorroAntdModule],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        NgZorroAntdModule,
    ]
})
export class SharedModule { }
