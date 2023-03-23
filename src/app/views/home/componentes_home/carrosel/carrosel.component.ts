
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-carrosel',
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss'],
})
export class NewCarroselComponent {
  constructor( private router: Router) { }
  customOptions: OwlOptions = {
    loop: false,
    autoWidth: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<img  src="../../assets/img/chevron-left.svg" alt="">', '<img src="../../assets/img/chevron-right.svg" alt="">'],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 1.2
      },
      400: {
        items: 1.3
      },
      500: {
        items: 1.8
      },
      600: {
        items: 2
      },
      650: {
        items: 2.3
      },
      740: {
        items: 2.7
      },
      800: {
        items: 3
      },
      840: {
        items: 3.1
      },
      940: {
        items: 3.3
      },
      1040: {
        items: 4
      },
      1100: {
        items: 4.1
      }
    },
    nav: true
  }

}
