import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

/** A router wrapper, adding extra functions. */
@Injectable()
export class prevroute {

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private router : Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  public getPreviousUrl(){
    console.log('=========================');
    console.log('prev- '+this.previousUrl);
    console.log('currnt- '+this.currentUrl);
    console.log('=========================');
    return this.previousUrl;
  }
}