import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;
  key = 'title';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadBreadcumbs();
    this.loadBreadcumbsWhenNavigated();
  }

  loadBreadcumbs() {
    this.activatedRoute.url.subscribe(() => {
      const snapshot = this.router.routerState.snapshot;
      this.breadcrumbs = [];
      const url = snapshot.url;
      const routeData = this.activatedRoute.snapshot.firstChild.firstChild.data;

      const label = routeData[this.key];
      const params = snapshot.root.params;

      this.breadcrumbs.push({
        url,
        label,
        params
      });
    });
  }

  loadBreadcumbsWhenNavigated() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        const url = snapshot.url;
        const routeData = route.snapshot.data;

        const label = routeData[this.key];
        const params = snapshot.root.params;

        this.breadcrumbs.push({
          url,
          label,
          params
        });
      });
  }
}
