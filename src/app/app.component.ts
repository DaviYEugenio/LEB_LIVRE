import { Component, NgModule } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LEB_LIVRE';
  currentNavItem?: string;
  public loading = false;
  ngOnInit() {
  }
}
