import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrls: ['./fb.component.css']
})
export class FbComponent implements OnInit {
  public endpoint = 'addorupdatedata';
  // public fb_user_id: any;
  // public fb_username: any;
  // public fb_email: any;
  // public fb_friends_total_count: any;
  // public fb_profile_picture_url: any;


  constructor(public FBS: FacebookService, public apiService: ApiService, public cookieService: CookieService) {
    let initParams: InitParams = {
      appId: '514543379015302',
      xfbml: true,
      version: 'v3.3'
  };

  FBS.init(initParams);
  // console.log()
  }
   

  ngOnInit() {
  }
  // loginWithFacebook(): void {
  //   console.log('is working');
  //   this.FBS.login({
  //     scope: 'picture'
  //   }).then((userData: any) => {
  //       this.FBS.api('/me/accounts', 'get', {
  //         perms: ['CREATE_CONTENT'] // get pages that the user can post to
  //       }).then(
  //         (res: any) => {
  //           let pagesList = res.data; // The pages that the user can post to
  //         },
  //         (err: any) => console.error(err)
  //       );
  //     },
  //     (err: any) => {
  //       console.error("Error logging in with Facebook: " + err);
  //     });
    
  //     //  this.FBS.login()
  //     //    .then((response: LoginResponse) => console.log(response))
  //     //    .catch((error: any) => console.error(error));
  //       //  this.getMyProfile();
  //    }
  private handleError(error) {
    console.error('Error processing action', error);
  }



  // facebook login fuction  start 

  loginWithFacebook() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,email'
    };

    this.FBS.login(loginOptions)
      .then((res: LoginResponse) => {
        // console.log('Logged in', res);
      })
      setTimeout(()=>{
        this.getMyProfile();
      },4000);
    } 
      // .catch(this.handleError);
      // this.FBS.api('/me?fields=id,name,email,picture,friends')
      // .then(res => {
      //   let result: any;
      //     result = res;
      //     console.log(result);
      //     console.log(result);
      //     console.log(result.friends.summary.total_count);
      //     console.log(result.picture.data.url);
      //     let data = {
      //       fb_user_id: result.id,
      //       fb_username: result.name,
      //       fb_email: result.email,
      //       id: this.cookieService.get('id'),
      //       fb_friends_total_count: result.friends.summary.total_count,
      //       fb_profile_picture_url: result.picture.data.url,
      //     }
      //     console.log(data);
      //     let data1 = {data: data,source:'users'};
      //     this.apiService.postData(this.endpoint, data1).subscribe(res =>{
      //       let result1: any={};
      //       result1 = res;
      //       console.log('result1');
      //       console.log(result1);
      //       if (result1.status == "success") {
      //         console.log('okkkk');
      //       }else
      //       {
      //         console.log('opps');
      //       }
            
      //     })
      //   })
      //   .catch(error => console.error(error));
    // }


    //  loginWithFacebook() {

    // const loginOptions: LoginOptions = {
    //   enable_profile_selector: true,
    //   return_scopes: true,
    //   scope: 'public_profile,email'
    // };

    // this.FBS.login(loginOptions)
    //   .then((res: LoginResponse) => {
    //     // console.log('Logged in', res);
    //   })
    //   // .catch(this.handleError);
    //   this.FBS.api('/me?fields=id,name,email,picture,friends')
    //   .then(res => {
    //     let result: any;
    //       result = res;
    //       console.log(result);
    //       console.log(result);
    //     })
    //     .catch(error => console.error(error));
    // }
    getMyProfile() {
      // must login before using `api`
      this.FBS.api('/me?fields=id,name,email,picture,friends')
      .then(res => {
        let result: any;
          result = res;
          console.log(result);
          console.log(result);
          console.log(result.friends.summary.total_count);
          console.log(result.picture.data.url);
          let data = {
            fb_user_id: result.id,
            fb_username: result.name,
            fb_email: result.email,
            id: this.cookieService.get('id'),
            fb_friends_total_count: result.friends.summary.total_count,
            fb_profile_picture_url: result.picture.data.url,
          }
          console.log(data);
          let data1 = {data: data,source:'fb'};
          this.apiService.postData(this.endpoint, data1).subscribe(res =>{
            let result1: any={};
            result1 = res;
            console.log('result1');
            console.log(result1);
            if (result1.status == "success") {
              console.log('okkkk');
            }else
            {
              console.log('opps');
            }
            
          })
        })
        .catch(error => console.error(error));
    }


}
