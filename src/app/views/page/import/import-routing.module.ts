import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportListComponent } from './import-list/import-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Nhập vật tư'
        },
        children: [
            {
                path: 'danh-sach',
                component: ImportListComponent,
                data: {
                    title: 'Danh sách vật tư'
                },
            },
            {
                path: '',
                redirectTo: 'danh-sach',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportsRoutingModule {
    static components = [
        ImportListComponent
    ];
}
