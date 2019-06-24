import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-audiodeadlinecontent',
  templateUrl: './audiodeadlinecontent.component.html',
  styleUrls: ['./audiodeadlinecontent.component.css']
})
export class AudiodeadlinecontentComponent implements OnInit {

  constructor(private router: Router) {
    $('html, body').animate({
      scrollTop: $("#myDiv").offset().top
    }, 2000);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}
