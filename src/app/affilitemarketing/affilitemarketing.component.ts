import { Component, OnInit,Inject } from '@angular/core';
import {ApiService} from "../api.service";
import {Router, ActivatedRoute} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Resolveservice } from '../resolveservice';
import { InitParams, FacebookService, UIResponse } from 'ngx-facebook';

declare const FB: any;
export interface DialogData {
  msg: string;
}

@Component({
  selector: 'app-affilitemarketing',
  templateUrl: './affilitemarketing.component.html',
  styleUrls: ['./affilitemarketing.component.css']
})
export class AffilitemarketingComponent implements OnInit {
public data: any;
public afflist: any;
public artistxp_banners: any;
public merchandise_banners: any;
public affiliatename: any;
public audiodeadline_full_url: any;
public artistxp_full_url: any;
public email: any;
public lastsharetime:any=0;
public user_id: any;
public endpoint: any='datalist';
public uploadfile: any='banner';
public artistxp_url_val: any ;

  constructor(public FBS: FacebookService,public apiservice: ApiService, public router: Router, private cookieService: CookieService, public dialog: MatDialog,public route: ActivatedRoute, public resolveservice: Resolveservice ) {
    // Facebook service (ngx-facebook) start
    let initParams: InitParams = {
      appId: '514543379015302',
      xfbml: true,
      version: 'v3.3'
  };

  FBS.init(initParams);


  // Facebook service end


    console.log(this.apiservice.resetpassword);
    console.log(this.apiservice.audio_img_folder_url);
    console.log(this.cookieService.get('id'));
    this.email = this.cookieService.get('email');
    this.user_id = this.cookieService.get('id');
    this.artistxp_url_val = apiservice.artistxp_url;
    console.log(this.artistxp_url_val);

    this.audiodeadline_full_url = this.apiservice.audiodeadlineshareticketsaleurl +''+this.user_id ;
    
    if(this.cookieService.get('id')!='' && this.cookieService.get('id')!=null )
    {
      this.getdata();
      this.artistxp_full_url = this.apiservice.artistxpsharesignupurl +''+this.user_id ;
    }
  }

  getdata(){
    let sourcecondition={_id_object:this.cookieService.get('id')};
    this.apiservice.getData({'source':'users',condition:sourcecondition}).subscribe(res=> {
      let result:any;
      result = res;
      if(result.res.length>0){
        console.log('affiliatename');
      //  console.log(result.res);
        this.affiliatename = result.res[0].auidodeadineusername;
        console.log(this.affiliatename);

      }
    });
  }

  ngOnInit() {
    this.route.data.forEach( (data) =>{
      console.log('data in resolve');
      console.log(data);
      this.afflist = data['results'].res;
    });


  /*  //ticket sales

    let data1={"type":7,"status":1};
    this.data = {"condition": data1,source:'mediaview'};
    this.apiservice.postaffilite(this.endpoint, this.data).subscribe( res => {
      let result: any;
      result = res;
      //console.log(result);
      this.afflist=result.res;
      console.log(this.afflist);
    })*/


    //Artistxp Sign Up Banners

    let data2={"type":9,"status":1};
    this.data = {"condition": data2,source:'new_mediaview'};
    this.apiservice.postaffilite(this.endpoint, this.data).subscribe( res => {
      let result: any;
      result = res;
      this.artistxp_banners=result.res;
      console.log('this.artistxp_banners');
      console.log(this.artistxp_banners);
    })

    //Merchandise Banners

    let data3={"type":8,"status":1};
    this.data = {"condition": data3,source:'mediaview'};
    this.apiservice.postaffilite(this.endpoint, this.data).subscribe( res => {
      let result: any;
      result = res;
      this.merchandise_banners=result.res;
      console.log(this.merchandise_banners);
    })
  }

  showcopied(){
    const dialogRef = this.dialog.open(Updatetest2, {
      // width: '250px',
      data: {msg: 'Url is copied.'},

    });
  }

// facebook share start

fbshareForAudiodeadline(item:any) {

  let currenttime =new Date().getTime();
  let options: any = {};
  console.log(item);

    options = {
      method: 'share',
      href: this.apiservice.audiodeadline_php_url+'sharetool23.php?media_id='+item.name+'&username='+this.affiliatename+'&image='+item.image
    };

  

  setTimeout(()=> {

    if (currenttime - this.lastsharetime > 5000) {
      this.FBS.ui(options)
          .then((res: UIResponse) => {
            // console.log('Got the users profile', res);
          })
          .catch(this.handleError);
      this.lastsharetime = currenttime;
    }

  },500);

}

fbshareForArtistxp(item:any) {

  let currenttime =new Date().getTime();
  let options: any = {};
  console.log(item);

    options = {
      method: 'share',
      href: this.apiservice.artistxp_php_url +'sharetool2.php?media_id='+item.media_id+'&username='+item.username+'&image='+item.image
    };

  

  setTimeout(()=> {

    if (currenttime - this.lastsharetime > 5000) {
      this.FBS.ui(options)
          .then((res: UIResponse) => {
            // console.log('Got the users profile', res);
          })
          .catch(this.handleError);
      this.lastsharetime = currenttime;
    }

  },500);

}

private handleError(error) {
  console.error('Error processing action', error);
}


  callforcopy(item: any){
   // console.log(this.apiservice.audiodeadlineshareticketsaleurl);
    //audiodeadline ticket sale
    return this.apiservice.audiodeadlineshareticketsaleurl+this.user_id;

    // return 'https://development.audiodeadline.com/'+this.affiliatename;
    // return 'http://api.audiodeadline.com/sharetool22.php?type=ticketsale&sponsorname='+item.sponsor+'&media_id='+item.name+'&image='+item.image+'&affiliate='+this.affiliatename;
    // return this.apiservice.audiodeadline_php_url+'sharetool22.php?type=ticketsale&sponsorname='+item.sponsor+'&media_id='+item.name+'&image='+item.image+'&affiliate='+this.affiliatename;
  }

  callforcopy1(item: any){
    //artistxp sign up
    return this.apiservice.artistxpsharesignupurl+this.user_id;

    // return 'https://development.artistxp.com/'+this.affiliatename;
    // return this.apiservice.audiodeadline_php_url+'sharetool2.php?media_id='+item.name+'&username='+this.affiliatename+'&image='+item.image;
  }

  callforcopy2(item: any){
    return this.apiservice.audiodeadline_php_url+'sharetool23.php?media_id='+item.name+'&username='+this.affiliatename+'&image='+item.image;
  }

  postinfb(username,media_id,image){
    var link = this.apiservice.audiodeadline_php_url+'sharetool22.php?type=ticketsale&sponsorname=&media_id='+media_id+'&image='+image+'&affiliate='+username;
    console.log('link');
    console.log(link);
    FB.ui({
      method: 'feed',
      link: link,
      name: " ",
      caption:" ",
      description: " "
    },function(response){
      console.log(response);
    });
  }

  postinfb2(username,media_id,image){
    var link = this.apiservice.artistxp_php_url +'sharetool2.php?media_id='+media_id+'&username='+username+'&image='+image;
    FB.ui({
      method: 'feed',
      link: link,
      name: " ",
      caption:" ",
      description: " "
    },function(response){
      // console.log(response);
    });
  }

  postinfb3(username,media_id,image){
    let link = this.apiservice.audiodeadline_php_url+'sharetool23.php?media_id='+media_id+'&username='+username+'&image='+image;
    FB.ui({
      method: 'feed',
      link: link,
      name: " ",
      caption:" ",
      description: " "
    },function(response){
      // console.log(response);
    });
  }
}



@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest2 {
  public modalmsg: any;

  constructor(public dialogRef: MatDialogRef<Updatetest2>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg = data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}