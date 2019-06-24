import {Component, OnInit, EventEmitter, TemplateRef, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "../api.service";
import { prevroute } from "../prevroute";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { filter } from 'rxjs/operators';
import {Updatetest4} from "../uploader/uploader.component";
export interface DialogData {
    msg: string;
}
@Component({
    selector: 'app-modeledit',
    templateUrl: './modeledit.component.html',
    styleUrls: ['./modeledit.component.css']
})
export class ModeleditComponent implements OnInit {
    public modeldata : any;
    public profileimg : any;
    public secondimg : any;
    public modelid : any;
    public stateslist : any=[];
    endpoint:any='datalist';
    endpoint1:any='addorupdatedata';
    artistxpprofileimageupdate:any='artistxpprofileimageupdate';
    secondimageupdate:any='secondimgupdate';
    public myForm: any;
    public modeldataimages: any;


    public endpoint2: any="signupshatterblok";
    public uploader: any = 'upload';
    public modeluploadpath: any = this.apiservice.modelfolder;
    public modelfilepath: any = this.apiservice.Model_Image_Url;

    constructor(  public _http: HttpClient, private router: Router, public route : ActivatedRoute, public apiservice: ApiService,public cookieService: CookieService,public fb: FormBuilder, public dialog: MatDialog,public prevroute: prevroute) {
        let previousurl1 = this.prevroute.getPreviousUrl();
        console.log(previousurl1);


        this.myForm = this.fb.group({
                id: [''],
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                age: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', ModeleditComponent.validateEmail],
                city: ['', Validators.required],
                state: ['', Validators.required],
                ethnicity: ['', Validators.required],
                height: ['', Validators.required],
                eyecolor: ['', Validators.required],
                haircolor: ['', Validators.required],
                weight: ['', Validators.required],
                bust: ['', Validators.required],
                waist: ['', Validators.required],
                hips: ['', Validators.required],
                /* password: ['', Validators.required],
      confirmpassword: ['', Validators.required],*/
                athletic: [''],
                slim: [''],
                toned: [''],
                voluptuous: [''],
                tattoos: [''],
                piercings: [''],
                promotions: ['', Validators.required],
                sales: ['', Validators.required],
                retail: ['', Validators.required],
                descriptionbox: ['', Validators.required],
                facebooklink: [''],
                instagramlink: ['', Validators.required],
                twitterlink: [''],
                modelmayhemlink: [''],
                // fileservername: [''],
                // filelocalname: [''],
                // type: [''],
                // status: [''],
            }
            // , {validator: this.machpassword('password', 'confirmpassword')}
        );
    }

    ngOnInit() {
        this.apiservice.getState().subscribe(res => {
            let result;
            result = res;
            this.stateslist = result;
        }, error => {
            console.log('Oooops!');
        });
        this.route.params.subscribe(params => {
            this.modelid = params['pagename'];
            console.log(this.modelid);
            let data1;
            if(this.modelid==null){
                data1={_id:this.cookieService.get('id')};
            }else{
                data1={_id:this.modelid};
            }

            let data2 = {"condition": data1,source:'users'};
            this.apiservice.postData(this.endpoint, data2).subscribe( res => {
                let result:any;
                result = res;
                console.log(result);
                if(result.res.length>0){
                    this.modeldata=result.res[0];
                    console.log('this.modeldata');
                    console.log(this.modeldata);
                    console.log(this.modeldata.images);
                    this.modeldataimages = this.modeldata.images;
                    console.log('==========================');
                    console.log(this.modeldataimages.length);
                    this.myForm = this.fb.group({
                            id: [this.modeldata._id],
                            firstname: [this.modeldata.firstname, Validators.required],
                            lastname: [this.modeldata.lastname, Validators.required],
                            age: [this.modeldata.age, Validators.required],
                            phone: [this.modeldata.phone, Validators.required],
                            email: [this.modeldata.email, ModeleditComponent.validateEmail],
                            city: [this.modeldata.city, Validators.required],
                            state: [this.modeldata.state, Validators.required],
                            ethnicity: [this.modeldata.ethnicity, Validators.required],
                            height: [this.modeldata.height, Validators.required],
                            eyecolor: [this.modeldata.eyecolor, Validators.required],
                            haircolor: [this.modeldata.haircolor, Validators.required],
                            weight: [this.modeldata.weight, Validators.required],
                            bust: [this.modeldata.bust, Validators.required],
                            waist: [this.modeldata.waist, Validators.required],
                            hips: [this.modeldata.hips, Validators.required],
                            /* password: ['', Validators.required],
                             confirmpassword: ['', Validators.required],*/
                            athletic: [this.modeldata.athletic],
                            slim: [this.modeldata.slim],
                            toned: [this.modeldata.toned],
                            voluptuous: [this.modeldata.voluptuous],
                            tattoos: [this.modeldata.tattoos],
                            piercings: [this.modeldata.piercings],
                            promotions: [this.modeldata.promotions, Validators.required],
                            sales: [this.modeldata.sales, Validators.required],
                            retail: [this.modeldata.retail, Validators.required],
                            descriptionbox: [this.modeldata.descriptionbox, Validators.required],
                            facebooklink: [this.modeldata.facebooklink],
                            instagramlink: [this.modeldata.instagramlink, Validators.required],
                            twitterlink: [this.modeldata.twitterlink],
                            modelmayhemlink: [this.modeldata.modelmayhemlink],
                            // fileservername: [this.modeldata.firstname],
                            // filelocalname: [this.modeldata.firstname],
                            // type: [this.modeldata.firstname],
                            // status: [''],
                        }
                        // , {validator: this.machpassword('password', 'confirmpassword')}
                    );
                    this.profileimg =this.modeldata.profile_img;
                    this.secondimg =this.modeldata.second_img;
                }
            });
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
        let previousurl = this.prevroute.getPreviousUrl();
        let x: any;
        let data = this.myForm.value;
        let data1 = {data: data,source:'users'};
        data1.data.images = this.apiservice.fileservername[this.uploader];
        console.log(data1);
        for (x in this.myForm.controls) {
            this.myForm.controls[x].markAsTouched();
        }
        if(this.myForm.valid){
            this.apiservice.postData(this.endpoint1, data1).subscribe(res => {
                let result: any = {};
                result = res;
                if (result.status == 'error') {
                }
                if (result.status == 'success') {
                    let data4;
                    if(this.modelid==null){
                         data4= {
                            email: this.cookieService.get('email'),
                            images: this.apiservice.fileservername[this.uploader].slice(this.modeldataimages.length, this.apiservice.fileservername[this.uploader].length)
                        }
                    }else{
                         data4= {
                            email: this.modeldata.email,
                            images: this.apiservice.fileservername[this.uploader].slice(this.modeldataimages.length, this.apiservice.fileservername[this.uploader].length)
                        }
                    }

                 /* let data4= {
                        email: this.cookieService.get('email'),
                        images: this.apiservice.fileservername[this.uploader].slice(this.modeldataimages.length, this.apiservice.fileservername[this.uploader].length)
                    }*/
                    //getting only newly added images
                   /* let data5 = {data: data4,source:'user'};
                    console.log(data5);*/
                    this.apiservice.postDatatoaudiodeadline(this.endpoint2, data4).subscribe(res => {
                        let result: any = {};
                        result = res;
                        // this.router.navigate('[/]');
                        console.log('previousurl');
                        console.log(previousurl);
                       this.router.navigate([previousurl]);
                           /* console.log('updated successfully');
                            const dialogRef = this.dialog.open(Updatetest3, {
                                data: {msg: 'Updated successfully'},

                            });
                        let data1;
                        if(this.modelid==null){
                            data1={_id:this.cookieService.get('id')};
                        }else{
                            data1={_id:this.modelid};
                        }
                            let data2 = {"condition": data1,source:'users'};
                            this.apiservice.postData(this.endpoint, data2).subscribe( res => {
                                let result:any;
                                result = res;
                                console.log(result);
                                if(result.res.length>0){
                                    this.modeldata=result.res[0];
                                    this.modeldataimages = this.modeldata.images;
                                }
                            });*/
                    }, error => {
                        console.log('Oooops!');
                    });

                    const dialogRef = this.dialog.open(Updatetest4, {
                        data: {msg: 'Profile updated successfully'},
                    });
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
export class Updatetest3 {
    public modalmsg: any;

    constructor(public dialogRef: MatDialogRef<Updatetest3>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data.msg);
        this.modalmsg = data.msg;

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
