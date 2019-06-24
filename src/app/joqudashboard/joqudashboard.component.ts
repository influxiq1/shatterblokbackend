import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../api.service";
import { CookieService } from 'ngx-cookie-service';
import { Resolveservice } from '../resolveservice';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import {DialogData, Updatetest} from "../managedashboard/managedashboard.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-joqudashboard',
  templateUrl: './joqudashboard.component.html',
  styleUrls: ['./joqudashboard.component.css']
})
export class JoqudashboardComponent implements OnInit {
  public datanew: any;
  public show: any = 1;
  public id: any;
  public joqu_status: any;
  public myForm: any;
  public stateslist: any;
  public isDisabled: any=false;
  public loaderdiv: any=false;
  public endpoint: any='addorupdatedata';
  public endpoint1: any='datalist';

  constructor(public apiservice: ApiService, public router: Router, private cookieService: CookieService,public route: ActivatedRoute, public resolveservice: Resolveservice,public fb: FormBuilder, public dialog: MatDialog) {
    this.myForm = this.fb.group({
      shatterblok_user_id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', JoqudashboardComponent.validateEmail],
      city: ['', Validators.required],
      state: ['', Validators.required],
      instagramlink: ['', Validators.required],
      status: [1],
    });
    this.id = this.cookieService.get('id');
    console.log(this.cookieService.get('id'));

    let data2 = {source:'joquuser',condition:{"shatterblok_user_id_object": this.id}};
    this.apiservice.postData(this.endpoint1, data2).subscribe(res => {
      let result: any = {};
      result = res;
      console.log(result);
      console.log(result.res.length);

      if (result.res.length > 0){
        this.show = 0;
      }
    })

   /* let  sourcecondition={type:type};
    this.apiservice.getData({'source':'model_influencer_contents_viewlistin_decending',condition:sourcecondition})
*/
  }

  ngOnInit() {


    this.route.data.forEach( (data) =>{
      console.log('data in dahsboard');
      console.log(data);
      this.datanew = data['results'].data;
      this.joqu_status = data['results'].joqu_status;
      console.log(this.datanew);
      console.log(this.joqu_status);
      this.myForm = this.fb.group({
            shatterblok_user_id: [this.datanew._id],
            firstname: [this.datanew.firstname, Validators.required],
            lastname: [this.datanew.lastname, Validators.required],
            age: [this.datanew.age, Validators.required],
            phone: [this.datanew.phone, Validators.required],
            email: [this.datanew.email, JoqudashboardComponent.validateEmail],
            city: [this.datanew.city, Validators.required],
            state: [this.datanew.state, Validators.required],
            instagramlink: [this.datanew.instagramlink, Validators.required],
            status: [1]
          }
      );
    });
    this.apiservice.getState().subscribe(res => {
      let result;
      result = res;
      this.stateslist = result;
    }, error => {
      console.log('Oooops!');
    });
  }
  static validateEmail(control: FormControl){
    if (control.value == '') {
      return { 'invalidemail': true };
    }
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(control.value).search(filter) == -1) {
      return { 'invalidemail': true };
    }
  }
  inputblur(val:any){
    this.myForm.controls[val].markAsUntouched();
  }
  onSubmit() {
    this.loaderdiv=true;
    let x: any;
    for (x in this.myForm.controls) {
      this.myForm.controls[x].markAsTouched();
    }
    if(this.myForm.valid){
      let data = this.myForm.value;
      let data1 = {data: data,source:'joquuser',sourceobj:['shatterblok_user_id']};
      this.apiservice.postData(this.endpoint, data1).subscribe(res => {
        let result: any = {};
        result = res;
        this.loaderdiv=false;
        if (result.status == 'error') {
        }
        if (result.status == 'success') {
          this.isDisabled=true;
          const dialogRef = this.dialog.open(Updatetest6, {
            data: {msg: 'Apply successfully.'},
          });
          this.myForm.reset();
          /* let data2 = {
            joqu_status: 1,
            id: this.datanew._id
          };
          let data3 = {data: data2,source:'users'};
          this.apiservice.postData(this.endpoint, data3).subscribe(res => {
            let result: any = {};
            result = res;
            if (result.status == 'error') {
            }
            if (result.status == 'success') {
              console.log('success');
            }
          }, error => {
            console.log('Oooops!');
          });*/
        }
      }, error => {
        console.log('Oooops!');
      });
    }
  }
}


@Component({
  selector: 'updatetest',
  templateUrl: '../commonmodals/updatemodal.html',
})
export class Updatetest6 {
  public modalmsg: any;

  constructor(
      public dialogRef: MatDialogRef<Updatetest6>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.msg);
    this.modalmsg=data.msg;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
