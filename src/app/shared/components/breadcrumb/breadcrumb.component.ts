import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

import { BreadCrumb } from '@model/bread-crumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  key = 'title';
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    console.log(route.routeConfig);
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data[this.key] : 'Home';
    console.log(label);
    // const path = route.routeConfig ? route.routeConfig.path : '';
    // // In the routeConfig the complete path is not available,
    // // so we rebuild it each time
    // const nextUrl = `${url}${path}/`;
    // const breadcrumb = {
    //   label,
    //   url: nextUrl,
    // };

    // console.log(nextUrl);
    // const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    // if (route.firstChild) {
    //   // If we are not on our current path yet,
    //   // there will be more children to look after, to build our breadcumb
    //   return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    // }
    // return newBreadcrumbs;

    return [];
  }
}
