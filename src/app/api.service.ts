
import {Injectable, ViewChild, EventEmitter, ElementRef} from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
// import {UploaderComponent} from "./uploader/uploader.component";


@Injectable()
export class ApiService {

    public domain =  environment["API_URL"];
    public download_shatter_url =  environment["download_shatter_url"];
    public download_artistxp_url =  environment["download_artistxp_url"];
    public loginurl = environment['loginurl'];
    public contact_us_url = environment['contact_us_url'];
    public _url = environment["API_URL"];
    public Pdf_link = environment["Pdf_link"];
    public Audiodeadline_API_URL = environment["Audiodeadline_API_URL"];
    public uplodeimg_url = environment["uplodeimg_url"];
    public audio_img_url = environment["audio_img_url"];
    public resetpassword = environment['resetpaswordurl'];
    public audio_img_folder_url = environment['audio_img_folder_url'];
    public audiodeadline_php_url = environment['audiodeadline_php_url'];
    public artistxp_php_url = environment['artistxp_php_url'];
    public artistxp_url = environment['artistxp_url'];
    public audiodeadline_fileurl = environment['audiodeadline_fileurl'];
    public jwttoken: any;

    public Model_Image_Url = environment['Model_Image_Url'];
    public Brand_Image_Url = environment['Brand_Image_Url'];
    public modelfolder = environment['modelfolder'];
    public brandfolder = environment['brandfolder'];
    public domain_for_fileupload = environment['domain_for_fileupload'];
    public audio_orderdetails = environment['audio_orderdetails'];
    public artistxpsharesignupurl = environment['artistxpsharesignupurl'];
    public audiodeadlineshareticketsaleurl = environment['audiodeadlineshareticketsaleurl'];
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;
    @ViewChild('fileInput1') uploaderInput: ElementRef;
    public lengthis;
    public percentageis;
    public inprogress;
    public progress:any=[];
    public uploadtype;
    public uploaderror:any='';
    fileservername:any=[];


    constructor(private _http: HttpClient,
                private _authHttp: HttpClient,
                public cookieService: CookieService
                // public jwtHelper: JwtHelperService,
                // private loggedinService: LoggedinService
    ) {
        this.jwttoken=this.cookieService.get('jwttoken');
        console.log('this.domain');
        console.log(this.domain);
        this.options = { concurrency: 10, maxUploads: 10 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }


    isTokenExpired() {

        // const helper = new JwtHelperService();
        // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
        // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
        // console.log('refresh_token',localStorage.getItem('refresh_token'))
        // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
        // console.log('id_token isExpired:',isIdTokenExpired)
        // console.log('refresh_token isExpired:',isRefreshTokenExpired)



    }

    getclientip() {

        console.log('endpoint');

        // this.isTokenExpired()
        var result = this._http.get("https://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));

        return result;
    }

    getDatawithouttoken(endpoint) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        /* console.log('httpOptions');
         console.log(httpOptions);*/
        // this.isTokenExpired()
        var result = this._http.get(this._url + endpoint, httpOptions).pipe(map(res => res));
        return result;
    }

    postaffilite(endpoint: any,data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        /* console.log('httpOptions');
         console.log(httpOptions);*/
        // this.isTokenExpired()
        var result = this._http.post(this.audio_img_url+endpoint,JSON.stringify(data), httpOptions).pipe(map(res => res));

        return result;
    }

   /* postorderdetails(endpoint: any,data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        /!* console.log('httpOptions');
         console.log(httpOptions);*!/
        // this.isTokenExpired()
        var result = this._http.post(this.audio_orderdetails+endpoint,JSON.stringify(data), httpOptions).pipe(map(res => res));

        return result;
    }*/
    getEndpointforpostorderdetails(endpoint: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        var result = this._http.post(this.audio_orderdetails + endpoint.source, JSON.stringify(endpoint.condition), httpOptions).pipe(map(res => res));
        console.log(result);
        return result;
    }
    getEndpoint(endpoint: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'access-token': this.cookieService.get('jwttoken')
            })
        };
        let condition:any=endpoint.condition;
        console.log('condition');
        console.log(condition);
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        console.log(this.cookieService.get('jwttoken'));

        // this.isTokenExpired()
        var result = this._http.post(this._url + endpoint.source, condition, httpOptions).pipe(map(res => res));
        console.log(result);
        return result;
    }

    getEndpointforudiedeadline(endpoint: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        var result = this._http.post(this.audio_img_url + endpoint.source, JSON.stringify(endpoint.condition), httpOptions).pipe(map(res => res));
        console.log(result);
        return result;
    }
/*    getEndpointforcommissiondetails(endpoint: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        let con={"condition":endpoint.condition,'source':endpoint.sourcview};
        var result = this._http.post(this.audio_img_url + endpoint.source, JSON.stringify(con), httpOptions).pipe(map(res => res));
        console.log(result);
        return result;
    }*/

    getData(endpoint: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'access-token': this.cookieService.get('jwttoken')
            })
        };
        console.log(this.cookieService.get('id'));
        console.log(this.cookieService.get('id'));
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        console.log(this.cookieService.get('jwttoken'));
        console.log('httpOptions');
        console.log(httpOptions);

        // this.isTokenExpired()
        var result = this._http.post(this._url + 'datalist', endpoint, httpOptions).pipe(map(res => res));

        return result;
    }
    getDataforimage(data: any) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'access-token': this.cookieService.get('jwttoken')
            })
        };
        console.log(this.cookieService.get('id'));
        console.log(this.cookieService.get('id'));
        console.log('endpoint');
        console.log(data);
        console.log('httpOptions');
        console.log(httpOptions);
        console.log(this.cookieService.get('jwttoken'));
        console.log('httpOptions');
        console.log(httpOptions);

        // this.isTokenExpired()
        var result = this._http.get(this._url + 'imagessavetobucket?path=/pictures_temp/', httpOptions).pipe(map(res => res));

        return result;
    }
    // getData end

    /*
     getData1(endpoint: any) {
     let data={source:"pending_and_notpending_application_view" , token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NTQzNjEzNjQsImlhdCI6MTU1NDI3NDk2NH0.vvJHBuA8AQj5crasnbKAYW9XgRQipeGN-COLpjTnUGk'};
     // this.isTokenExpired()
     var result = this._http.post(this._url + 'datalist', data).pipe(map(res => res));

     return result;
     }*/



    postData(endpoint:any, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'access-token': this.cookieService.get('jwttoken')
            })
        };
        console.log(this.cookieService.get('jwttoken'));
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
        return result;
    }
    postDatawithoutToken(endpoint:any, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        console.log(this.cookieService.get('jwttoken'));
        console.log('endpoint');
        console.log(endpoint);
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
        return result;
    }
    postDatatoaudiodeadline(endpoint:any, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        console.log('endpoint');
        console.log(endpoint);
        var result = this._http.post(this.getEndpointUrlforudiodeadline(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
        return result;
    }

    postlogin(endpoint:any, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        console.log(this.cookieService.get('jwttoken'));
        console.log('endpoint');
        console.log(endpoint);
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map(res => res));
        return result;
    } // postData end


    /*
     putData(endpoint:any, data, id:any) {
     const httpOptions = {
     headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': this.cookieService.get('jwttoken')
     })
     };
     console.log(this.cookieService.get('jwttoken'));
     console.log(this.cookieService.get('id'));
     console.log("endpoint");
     console.log(endpoint);
     var result = this._http.put(this.getEndpointUrl(endpoint)+'/'+id, JSON.stringify(data), httpOptions).pipe(map(res => res));
     return result;
     }*/

    putData(endpoint:any,data,id:any,is_cache_buster=true){

        if (is_cache_buster==true){
            let ran = Math.floor(Math.random() * 10000) + 1;
            var cache_buster = '?cache=' + ran.toString();
            endpoint = endpoint + cache_buster;
        }

        this.isTokenExpired()

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                // 'AutAuthorization': this.cookieService.get('jwttoken')
            })
        };
        var result =this._http.put(this.getEndpointUrl(endpoint),JSON.stringify(data),httpOptions).pipe(map(res => res));

        return result;
    } //end putData

    getState() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        var result = this._http.get('assets/data/state.json').pipe(map(res => res));
        return result;
    }

    private getEndpointUrl(endpoint: string) {
        return this._url + endpoint;
    }
    private getEndpointUrlforudiodeadline(endpoint: string) {
        return this.Audiodeadline_API_URL + endpoint;
    }
    onUploadOutput(output: UploadOutput,arrayval:any,uploadtypec:any,uploadpath:any): void {
        if (output.type === 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: this.domain_for_fileupload+'uploads',
                method: 'POST',
                data: { path: uploadpath }
            };
            this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            if (output.file.response != '') {
                this.files = [];
                this.files.push(output.file);
                console.log('this.files*********');
                console.log(this.files);
                this.lengthis = this.files.length;
                this.percentageis = this.files[0].progress.data.percentage;
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
            this.lengthis = this.files.length;
            if(this.files[0]!=null && this.files[0].progress!=null)
                this.percentageis = this.files[0].progress.data.percentage;
            console.log('this.files==================');
            console.log(this.files);
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        console.log('files-');
        console.log(this.files);
        if(this.files[0]!=null && this.files[0].progress!=null) {
            if(this.progress[arrayval]==null)this.progress[arrayval]=0;
            this.inprogress=true;
            console.log('this.files[0].progress.data.percentage');
            console.log(this.files[0].progress.data.percentage);
            this.progress[arrayval] = (this.files[0].progress.data.percentage);
            if(this.progress[arrayval]==100) {
                this.progress[arrayval]=null;
                this.inprogress=null;
            }
            console.log('this.uploadtype in api service');
            console.log(uploadtypec);
        }
        if (uploadtypec=='single'){
            // this.fileservername = [];
            if(this.fileservername[arrayval] == null) this.fileservername[arrayval]=[];
            this.fileservername[arrayval]=[];
            if(this.files[0].response!=null) this.fileservername[arrayval].push(this.files[0].response);
        }
        if (uploadtypec == 'multiple') {
            console.log('this.files[0].response');
            // console.log(this.files[0].response);
            console.log(this.files.length);
            console.log(this.files);
            if (this.fileservername[arrayval] == null) this.fileservername[arrayval] = [];
            // if(this.files[0].response!=null){
            if(this.files.length==1) {
                if(this.files[0] && this.files[0].response!=null && this.files[0].response.error_code==null ) {
                    this.fileservername[arrayval].push(this.files[0].response);
                    this.files = [];
                    this.uploaderror='';
                }
                if(this.files[0] !=null && this.files[0].response!=null && this.files[0].response.error_code!=null){
                    this.uploaderror='error occured on uploading !!!';
                }
            }
            if(this.files.length>1)
            {
                console.log('sdfdsf==== in multiple length ');
                for(let b in this.files){
                    if(this.files[b].response!=null && this.files[b].response.error_code==null) {
                        this.fileservername[arrayval].push(this.files[b].response);
                    }
                }
                this.files=[];
            }
            //}
        }
        console.log('this.fileservername');
        console.log(this.fileservername);
        console.log(this.uploaderror);
        /*    if(pagename=='modeledit'){
         let  data ={
         id:this.cookieService.get('id'),
         images:this.fileservername,
         create_a_user: "true"
         }

         let data1 = {data: data,source:'users'};
         console.log(data1);
         this.postData('addorupdatedata', data1).subscribe( res => {
         let result: any = {};
         result = res;
         console.log('result');
         console.log(result);
         if (result.status == 'success') {
         }
         })
         }*/
    }
}
