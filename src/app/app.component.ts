import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.service';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { HeaderService } from './shared/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ opacity: 0 })
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})

export class AppComponent {
  isHeaderVisible = false;

  constructor(private titleService: TitleService, private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.headerVisible$.subscribe((visible) => {
      this.isHeaderVisible = visible;
    });

    this.titleService.initTitle();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
