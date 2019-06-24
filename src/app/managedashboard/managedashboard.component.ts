import {Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../app/api.service';
import { Resolveservice } from '../../app/resolveservice';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  msg: string;
}
@Component({
  selector: 'app-managedashboard',
  templateUrl: './managedashboard.component.html',
  styleUrls: ['./managedashboard.component.css']
})
export class ManagedashboardComponent implements OnInit {
  //  public endpoint1 = 'insertsingledata';
    public endpoint1 = 'addorupdatedata';
  public myForm: any;
  public modelid: any;
  public errormg: any = '';
  public ckeditorContent: any;
  public model_influencer_list: any=[];
  public errckeditor;

  
  constructor(public fb: FormBuilder, private cookieService: CookieService, public http: HttpClient, public apiService: ApiService, public router: Router, public resolveservice: Resolveservice,public dialog: MatDialog) {
    this.myForm = this.fb.group({
      type: ['',  Validators.required],
      content: ['', Validators.required],
      created_by: [this.cookieService.get('id')]
    });
  }

  ngOnInit() {
    this.getdata();
  }

  getdata(){
    let sourcecondition={};
     this.apiService.getData({'source':'model_influencer_contents_viewlistin_decending',condition:sourcecondition}).subscribe(res=> {
       let result:any;
       result = res;
      if(result.res.length>0){
        this.myForm = this.fb.group({
          type: [result.res[0].type,  Validators.required],
          content: [result.res[0].content, Validators.required],
          created_by: [this.cookieService.get('id')]
        });
        this.modelid=result.res[0]._id;
        this.ckeditorContent=result.res[0].content;
      }
      this.versionlist(result.res[0].type);
    });
  }

  versionlist(type){
  let  sourcecondition={type:type};
    this.apiService.getData({'source':'model_influencer_contents_viewlistin_decending',condition:sourcecondition}).subscribe(res=> {
      let result: any;
      result = res;
      if(result.res.length>0){
        this.model_influencer_list=result.res;
      }
      else{
        this.model_influencer_list=[];
      }
    });
  }

  showdata(){
    let i;
    for (i in this.model_influencer_list){
      if(this.model_influencer_list[i]._id==this.modelid){
        this.myForm = this.fb.group({
          type: [this.model_influencer_list[i].type,  Validators.required],
          content: [this.model_influencer_list[i].content, Validators.required],
          created_by: [this.cookieService.get('id')]
        });
        this.ckeditorContent=this.model_influencer_list[i].content;
      }
    }
  }

  changedata(){
    this.versionlist(this.myForm.controls['type'].value);
    setTimeout(()=>{
      this.myForm = this.fb.group({
          type: [this.model_influencer_list[0].type,  Validators.required],
          content: [this.model_influencer_list[0].content, Validators.required],
        created_by: [this.cookieService.get('id')]
        });
        this.ckeditorContent=this.model_influencer_list[0].content;
        // this.myForm.patchValue({content: this.model_influencer_list[0].content});
    },1000);
  }

  onSubmit(){
    console.log('=============================');
    console.log(this.myForm.value);
    this.errckeditor = false;
    /*let data = {data:this.myForm.value};
    data.data.content=this.ckeditorContent;
    data.data.created_by=  this.cookieService.get('id');*/

    if (this.ckeditorContent == null) {
      this.errckeditor = true;
    }
    else {
      this.errckeditor = false;
    }
    let x;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
   // console.log(data);
    if(this.errckeditor==false && this.myForm.valid){
  /*    let data1 = {data,source:'model_influencer_contents',sourceobj:['created_by']};
      console.log(data1);
      let data = {data:this.myForm.value};
      console.log(data);*/
      this.apiService.postData(this.endpoint1, {source:'model_influencer_contents',data:this.myForm.value,sourceobj:['created_by']}).subscribe( res => {

     // this.apiService.postData(this.endpoint1, data).subscribe( res => {
     //   this._http.post(link,{source:'model_influencer_contents',data:this.myForm.value,sourceobj:['created_by']})

        let result: any = {};
        result = res;
        if (result.status == 'error') {
          this.errormg = result.msg;
        }
        if (result.status == 'success') {
          this.getdata();
          const dialogRef = this.dialog.open(Updatetest, {
            data: {msg: 'Data inserted successfully.'},
          });
          this.myForm.reset();
          console.log('result');
          console.log(result);
     //     console.log(result.res.content);
          this.myForm = this.fb.group({
            type: [result.res.type,  Validators.required],
            content: [result.res.content, Validators.required],
            created_by: [this.cookieService.get('id')]
          });
          this.ckeditorContent=result.res.content;
        }
      }, error => {
        console.log('Oooops!');
      });

    /*  this.apiService.postData(this.endpoint1, data).subscribe(res => {
        let result: any = {};
        result = res;
        if (result.status == 'error') {
          this.errormg = result.msg;
        }
        if (result.status == 'success') {
          this.getdata();
          const dialogRef = this.dialog.open(Updatetest, {
          });
          this.myForm.reset();
          this.myForm = this.fb.group({
            type: [result.results.type,  Validators.required],
            content: [result.results.content, Validators.required]
          });
          this.ckeditorContent=result.results.content;
           }
      }, error => {
        console.log('Oooops!');
      });*/
    }
  }

  inputblur(val:any){
    this.myForm.controls[val].markAsUntouched();
  }
  onChange(event: any) {
 //   console.log('hie');
   // console.log(this.ckeditorContent);
    this.myForm.patchValue({content: this.ckeditorContent});
    //console.log(this.myForm.value);
  }
}


@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest {
  public modalmsg: any;

  constructor(
      public dialogRef: MatDialogRef<Updatetest>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg=data.msg;
 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/*

public model_influencer_list: any=[]; 
public model_influencer_list_change: any=[];
changedata(){ 
  this.model_influencer_list=[]; 
  for (let i in this.model_influencer_list_change){ 
    if(this.model_influencer_list_change[i].type==this.myForm.controls['type'].value){ 
      this.model_influencer_list.push(this.model_influencer_list_change[i]); 
    } 
  } 
  this.myForm = this.fb.group({ 
    type: [this.model_influencer_list[0].type,  Validators.required], 
    content: [this.model_influencer_list[0].content, Validators.required] 
  }); 
  this.ckeditorContent=this.model_influencer_list[0].content; 
}

getdata(){ 
  let sourcecondition={}; 
  this.apiService.getData({'source':'model_influencer_contents_viewlistin_decending',condition:sourcecondition}).subscribe(res=> { 
    let result:any;
                result = res; 
    if(result.res.length>0){ 
      this.myForm = this.fb.group({ 
        type: [result.res[0].type,  Validators.required], 
        content: [result.res[0].content, Validators.required] 
      }); 
      this.modelid=result.res[0]._id; 
      this.ckeditorContent=result.res[0].content;  
      this.model_influencer_list_change=result.res; 
      for (let i in this.model_influencer_list_change){ 
        if(this.model_influencer_list_change[i].type==result.res[0].type){ 
          this.model_influencer_list.push(this.model_influencer_list_change[i]); 
        } 
      } 
    } 
  }); 
}*/


//
// CKEDITOR.stylesSet.add('mystyles', [
//
//   { element: 'h3',      styles: { 'color': 'Blue' } },
//   { element: 'div',      styles: { 'color': 'Blue', 'background-color':'Red' } },
//   { name: 'Red Title',        element: 'h3',      styles: { 'color': 'Red' } },
//
//   // Inline Styles
//   { name: 'Marker: Yellow',   element: 'span',    styles: { 'background-color': 'Yellow' } },
//   { name: 'Marker: Green',    element: 'span',    styles: { 'background-color': 'Lime' } },
//
//   // Object Styles
//   {
//     name: 'Image on Left',
//     element: 'img',
//     attributes: {
//       style: 'padding: 5px; margin-right: 5px',
//       border: '2',
//       align: 'left'
//     }
//   }
// ] );