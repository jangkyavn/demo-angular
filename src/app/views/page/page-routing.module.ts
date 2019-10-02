import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Nghiệp vụ'
        },
        children: [
            {
                path: '',
                redirectTo: 'nhap',
                pathMatch: 'full'
            },
            {
                path: 'nhap',
                loadChildren: () => import('./import/import.module').then(m => m.ImportModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
