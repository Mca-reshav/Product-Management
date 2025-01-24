import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) { }

  public initTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let routeData = this.getRouteData(this.activatedRoute);
      let title = routeData['title'] ? `Ecom | ${routeData['title']}` : 'Ecom';
      this.titleService.setTitle(title);
    });
  }

  private getRouteData(route: ActivatedRoute): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data;
  }
}
