/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, EventEmitter, Injectable, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { humanizeBytes } from 'ngx-uploader';
var ApiService = /** @class */ (function () {
    /*@Input()
    set uploadOutput(uploadOutput: any){
      this.uploadOutputval = uploadOutput;
      console.log('this.uploadOutput');
      console.log(this.uploadOutput);
    }*/
    function ApiService(_http, _authHttp) {
        this._http = _http;
        this._authHttp = _authHttp;
        this.domain_for_fileupload_val = 'http://developmentapi.audiodeadline.com:7031/uploads' + 'uploads';
        this.progress = [];
        this.uploaderror = '';
        // public uploadOutputval:any;
        this.fileservername = [];
        this.options = { concurrency: 10, maxUploads: 10 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        //console.log('this.domain');
        //console.log(this.domain);
    }
    /**
     * @param {?} uploadOutput
     * @param {?} arrayvalue
     * @param {?} uploadtypec
     * @param {?} uploadpath
     * @return {?}
     */
    ApiService.prototype.onUploadOutput = /**
     * @param {?} uploadOutput
     * @param {?} arrayvalue
     * @param {?} uploadtypec
     * @param {?} uploadpath
     * @return {?}
     */
    function (uploadOutput, arrayvalue, uploadtypec, uploadpath) {
        // this.uploaderInput.nativeElement.value = '';
        if (uploadOutput.type === 'allAddedToQueue') {
            /** @type {?} */
            var event_1 = {
                type: 'uploadAll',
                url: 'http://developmentapi.audiodeadline.com:7031/uploads',
                method: 'POST',
                data: { path: uploadpath }
            };
            this.uploadInput.emit(event_1);
        }
        else if (uploadOutput.type === 'addedToQueue' && typeof uploadOutput.file !== 'undefined') {
            if (uploadOutput.file.response != '') {
                this.files = [];
                this.files.push(uploadOutput.file);
                console.log('this.files*********');
                console.log(this.files);
                this.lengthis = this.files.length;
                this.percentageis = this.files[0].progress.data.percentage;
            }
        }
        else if (uploadOutput.type === 'uploading' && typeof uploadOutput.file !== 'undefined') {
            /** @type {?} */
            var index = this.files.findIndex((/**
             * @param {?} file
             * @return {?}
             */
            function (file) { return typeof uploadOutput.file !== 'undefined' && file.id === uploadOutput.file.id; }));
            this.files[index] = uploadOutput.file;
            this.lengthis = this.files.length;
            if (this.files[0] != null && this.files[0].progress != null)
                this.percentageis = this.files[0].progress.data.percentage;
            console.log('this.files==================');
            console.log(this.files);
        }
        else if (uploadOutput.type === 'removed') {
            this.files = this.files.filter((/**
             * @param {?} file
             * @return {?}
             */
            function (file) { return file !== uploadOutput.file; }));
        }
        else if (uploadOutput.type === 'dragOver') {
            this.dragOver = true;
        }
        else if (uploadOutput.type === 'dragOut') {
            this.dragOver = false;
        }
        else if (uploadOutput.type === 'drop') {
            this.dragOver = false;
        }
        console.log('files');
        console.log(this.files);
        if (this.files[0] != null && this.files[0].progress != null) {
            if (this.progress[arrayvalue] == null)
                this.progress[arrayvalue] = 0;
            this.inprogress = true;
            console.log('file upload progressing');
            console.log(this.files[0].progress.data.percentage);
            this.progress[arrayvalue] = (this.files[0].progress.data.percentage);
            if (this.progress[arrayvalue] == 100) {
                this.progress[arrayvalue] = null;
                this.inprogress = null;
            }
            console.log('this.uploadtype in api service');
            console.log(uploadtypec);
        }
        if (uploadtypec == 'single') {
            // this.fileservername = [];
            if (this.fileservername[arrayvalue] == null)
                this.fileservername[arrayvalue] = [];
            this.fileservername[arrayvalue] = [];
            if (this.files[0].response != null)
                this.fileservername[arrayvalue].push(this.files[0].response);
        }
        if (uploadtypec == 'multiple') {
            console.log('this.files[0].response');
            // console.log(this.files[0].response);
            console.log(this.files.length);
            console.log(this.files);
            if (this.fileservername[arrayvalue] == null)
                this.fileservername[arrayvalue] = [];
            // if(this.files[0].response!=null){
            if (this.files.length == 1) {
                if (this.files[0] && this.files[0].response != null && this.files[0].response.error_code == null) {
                    this.fileservername[arrayvalue].push(this.files[0].response);
                    this.files = [];
                    this.uploaderror = '';
                }
                if (this.files[0] != null && this.files[0].response != null && this.files[0].response.error_code != null) {
                    this.uploaderror = 'error occured on uploading !!!';
                }
            }
            if (this.files.length > 1) {
                console.log('sdfdsf==== in multiple length ');
                for (var b in this.files) {
                    if (this.files[b].response != null && this.files[b].response.error_code == null) {
                        this.fileservername[arrayvalue].push(this.files[b].response);
                    }
                }
                this.files = [];
            }
            //}
        }
        console.log('this.fileservername');
        console.log(this.fileservername);
        console.log(this.uploaderror);
        //this.uploaderservice.filenamevalc1=this.fileservername;
        //UploaderComponent.filenamevalc1=87;
        //console.log(classval);
    };
    /**
     * @return {?}
     */
    ApiService.prototype.isTokenExpired = /**
     * @return {?}
     */
    function () {
        // const helper = new JwtHelperService();
        // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
        // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
        // console.log('refresh_token',localStorage.getItem('refresh_token'))
        // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
        // console.log('id_token isExpired:',isIdTokenExpired)
        // console.log('refresh_token isExpired:',isRefreshTokenExpired)
    };
    /**
     * @return {?}
     */
    ApiService.prototype.getclientip = /**
     * @return {?}
     */
    function () {
        console.log('endpoint');
        // this.isTokenExpired()
        /** @type {?} */
        var result = this._http.get("http://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @return {?}
     */
    ApiService.prototype.getEndpoint = /**
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': ''
            })
        };
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        console.log('');
        // this.isTokenExpired()
        /** @type {?} */
        var result = this._http.post('' + endpoint.source, {}, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @return {?}
     */
    ApiService.prototype.getData = /**
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': ''
            })
        };
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        console.log('');
        // this.isTokenExpired()
        /** @type {?} */
        var result = this._http.post('' + 'datalist', endpoint, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    // getData end
    // getData end
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    ApiService.prototype.postData = 
    // getData end
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': ''
            })
        };
        console.log('');
        console.log('endpoint');
        console.log(endpoint);
        console.log('httpOptions');
        console.log(httpOptions);
        /** @type {?} */
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    ApiService.prototype.postDatawithoutToken = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log('');
        console.log('endpoint');
        console.log(endpoint);
        /** @type {?} */
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    ApiService.prototype.postlogin = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log('');
        console.log('endpoint');
        console.log(endpoint);
        /** @type {?} */
        var result = this._http.post(this.getEndpointUrl(endpoint), JSON.stringify(data), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    }; // postData end
    // postData end
    /**
     * @param {?} link
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.postSearch = 
    // postData end
    /**
     * @param {?} link
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    function (link, token, source) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
        console.log('------ ');
        console.log("link in postSearch");
        console.log(link);
        console.log(source);
        /** @type {?} */
        var result = this._http.post(link, source, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} link
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.postSearch1 = /**
     * @param {?} link
     * @param {?} source
     * @return {?}
     */
    function (link, source) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': source.token
            })
        };
        console.log('------ ');
        console.log("link");
        console.log(link);
        /** @type {?} */
        var result = this._http.post(link, source).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} id
     * @return {?}
     */
    ApiService.prototype.putData = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} id
     * @return {?}
     */
    function (endpoint, data, id) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': ''
            })
        };
        console.log('');
        console.log("endpoint");
        console.log(endpoint);
        /** @type {?} */
        var result = this._http.put(this.getEndpointUrl(endpoint) + '/' + id, JSON.stringify(data), httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.deteOneData = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    function (endpoint, data, token, source) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
        console.log('------ ');
        console.log("endpoint");
        console.log(endpoint);
        console.log(data);
        /** @type {?} */
        var dataval;
        dataval = { source: source, id: data._id };
        /** @type {?} */
        var result = this._http.post(endpoint, dataval, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.togglestatus = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    function (endpoint, data, token, source) {
        console.log(endpoint);
        console.log(data);
        console.log(token);
        console.log(source);
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
        console.log('------ ');
        console.log("endpoint");
        console.log(endpoint);
        console.log(data);
        /** @type {?} */
        var dataval;
        dataval = { source: source, data: data };
        /** @type {?} */
        var result = this._http.post(endpoint, dataval, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.deteManyData = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    function (endpoint, data, token, source) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
        console.log('------ ');
        console.log("endpoint");
        console.log(endpoint);
        console.log(data);
        /** @type {?} */
        var dataval;
        dataval = { source: source, ids: data };
        /** @type {?} */
        var result = this._http.post(endpoint + 'many', dataval, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} val
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    ApiService.prototype.togglestatusmany = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?} val
     * @param {?} token
     * @param {?} source
     * @return {?}
     */
    function (endpoint, data, val, token, source) {
        /** @type {?} */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'access-token': token
            })
        };
        console.log('------ ');
        console.log("endpoint");
        console.log(endpoint);
        console.log(data);
        /** @type {?} */
        var dataval;
        dataval = { source: source, data: { ids: data, val: val } };
        /** @type {?} */
        var result = this._http.post(endpoint + 'many', dataval, httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; })));
        return result;
    };
    /**
     * @private
     * @param {?} endpoint
     * @return {?}
     */
    ApiService.prototype.getEndpointUrl = /**
     * @private
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        return '' + endpoint;
    };
    ApiService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: HttpClient }
    ]; };
    ApiService.propDecorators = {
        uploaderInput: [{ type: ViewChild, args: ['fileInput1',] }]
    };
    return ApiService;
}());
export { ApiService };
if (false) {
    /** @type {?} */
    ApiService.prototype.domain_for_fileupload_val;
    /** @type {?} */
    ApiService.prototype.files;
    /** @type {?} */
    ApiService.prototype.uploadInput;
    /** @type {?} */
    ApiService.prototype.humanizeBytes;
    /** @type {?} */
    ApiService.prototype.dragOver;
    /** @type {?} */
    ApiService.prototype.options;
    /** @type {?} */
    ApiService.prototype.uploaderInput;
    /** @type {?} */
    ApiService.prototype.lengthis;
    /** @type {?} */
    ApiService.prototype.percentageis;
    /** @type {?} */
    ApiService.prototype.inprogress;
    /** @type {?} */
    ApiService.prototype.progress;
    /** @type {?} */
    ApiService.prototype.uploadtype;
    /** @type {?} */
    ApiService.prototype.uploaderror;
    /** @type {?} */
    ApiService.prototype.fileservername;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype._http;
    /**
     * @type {?}
     * @private
     */
    ApiService.prototype._authHttp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saXN0aW5nLWFuZ3VsYXI3LyIsInNvdXJjZXMiOlsibGliL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQVMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBYSxHQUFHLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBeUMsYUFBYSxFQUFpQyxNQUFNLGNBQWMsQ0FBQztBQUduSDtJQXdCRTs7Ozs7T0FLRztJQUNILG9CQUFvQixLQUFpQixFQUNqQixTQUFxQjtRQURyQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVk7UUE3QmxDLDhCQUF5QixHQUFRLHNEQUFzRCxHQUFHLFNBQVMsQ0FBRTtRQWdCckcsYUFBUSxHQUFLLEVBQUUsQ0FBQztRQUVoQixnQkFBVyxHQUFLLEVBQUUsQ0FBQzs7UUFFMUIsbUJBQWMsR0FBSyxFQUFFLENBQUM7UUFZcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsOEJBQThCO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQyxDQUFDLHlEQUF5RDtRQUM3RyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyw2QkFBNkI7UUFDN0IsMkJBQTJCO0lBQzdCLENBQUM7Ozs7Ozs7O0lBRUQsbUNBQWM7Ozs7Ozs7SUFBZCxVQUFlLFlBQTBCLEVBQUUsVUFBZSxFQUFFLFdBQWdCLEVBQUUsVUFBZTtRQUMz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RyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsRUFBQyxDQUFDO1FBQ3hGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUlPLG1DQUFjOzs7OztJQUF0QixVQUF1QixRQUFnQjtRQUNuQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Z0JBcFhGLFVBQVU7Ozs7Z0JBSkYsVUFBVTtnQkFBVixVQUFVOzs7Z0NBWWhCLFNBQVMsU0FBQyxZQUFZOztJQThXekIsaUJBQUM7Q0FBQSxBQXRYRCxJQXNYQztTQXJYWSxVQUFVOzs7SUFDckIsK0NBQTRHOztJQUM1RywyQkFBb0I7O0lBQ3BCLGlDQUF1Qzs7SUFDdkMsbUNBQXdCOztJQUN4Qiw4QkFBa0I7O0lBQ2xCLDZCQUF5Qjs7SUFDekIsbUNBQW1EOztJQU9uRCw4QkFBZ0I7O0lBQ2hCLGtDQUFvQjs7SUFDcEIsZ0NBQWtCOztJQUNsQiw4QkFBdUI7O0lBQ3ZCLGdDQUFrQjs7SUFDbEIsaUNBQTBCOztJQUUxQixvQ0FBc0I7Ozs7O0lBUVYsMkJBQXlCOzs7OztJQUN6QiwrQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcCwgdGFrZVdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFVwbG9hZE91dHB1dCwgVXBsb2FkSW5wdXQsIFVwbG9hZEZpbGUsIGh1bWFuaXplQnl0ZXMsIFVwbG9hZGVyT3B0aW9ucywgVXBsb2FkU3RhdHVzIH0gZnJvbSAnbmd4LXVwbG9hZGVyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XG4gIHB1YmxpYyBkb21haW5fZm9yX2ZpbGV1cGxvYWRfdmFsOiBhbnkgPSAnaHR0cDovL2RldmVsb3BtZW50YXBpLmF1ZGlvZGVhZGxpbmUuY29tOjcwMzEvdXBsb2FkcycgKyAndXBsb2FkcycgO1xuICBmaWxlczogVXBsb2FkRmlsZVtdO1xuICB1cGxvYWRJbnB1dDogRXZlbnRFbWl0dGVyPFVwbG9hZElucHV0PjtcbiAgaHVtYW5pemVCeXRlczogRnVuY3Rpb247XG4gIGRyYWdPdmVyOiBib29sZWFuO1xuICBvcHRpb25zOiBVcGxvYWRlck9wdGlvbnM7XG4gIEBWaWV3Q2hpbGQoJ2ZpbGVJbnB1dDEnKSB1cGxvYWRlcklucHV0OiBFbGVtZW50UmVmO1xuICAvKkBJbnB1dCgpXG4gIHNldCBkb21haW5fZm9yX2ZpbGV1cGxvYWQoZG9tYWluX2Zvcl9maWxldXBsb2FkOiBhbnkpIHtcbiAgICB0aGlzLmRvbWFpbl9mb3JfZmlsZXVwbG9hZF92YWwgPSBkb21haW5fZm9yX2ZpbGV1cGxvYWQ7XG4gICAgY29uc29sZS5sb2coJ3RoaXMuc2tpcHZhbCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZG9tYWluX2Zvcl9maWxldXBsb2FkX3ZhbCk7XG4gIH0qL1xuICBwdWJsaWMgbGVuZ3RoaXM7XG4gIHB1YmxpYyBwZXJjZW50YWdlaXM7XG4gIHB1YmxpYyBpbnByb2dyZXNzO1xuICBwdWJsaWMgcHJvZ3Jlc3M6YW55PVtdO1xuICBwdWJsaWMgdXBsb2FkdHlwZTtcbiAgcHVibGljIHVwbG9hZGVycm9yOmFueT0nJztcbiAgLy8gcHVibGljIHVwbG9hZE91dHB1dHZhbDphbnk7XG4gIGZpbGVzZXJ2ZXJuYW1lOmFueT1bXTtcblxuICAvKkBJbnB1dCgpXG4gIHNldCB1cGxvYWRPdXRwdXQodXBsb2FkT3V0cHV0OiBhbnkpe1xuICAgIHRoaXMudXBsb2FkT3V0cHV0dmFsID0gdXBsb2FkT3V0cHV0O1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnVwbG9hZE91dHB1dCcpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMudXBsb2FkT3V0cHV0KTtcbiAgfSovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2F1dGhIdHRwOiBIdHRwQ2xpZW50LFxuXG4gICAgICAgICAgICAgICkge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgY29uY3VycmVuY3k6IDEwLCBtYXhVcGxvYWRzOiAxMCB9O1xuICAgIHRoaXMuZmlsZXMgPSBbXTsgLy8gbG9jYWwgdXBsb2FkaW5nIGZpbGVzIGFycmF5XG4gICAgdGhpcy51cGxvYWRJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkSW5wdXQ+KCk7IC8vIGlucHV0IGV2ZW50cywgd2UgdXNlIHRoaXMgdG8gZW1pdCBkYXRhIHRvIG5neC11cGxvYWRlclxuICAgIHRoaXMuaHVtYW5pemVCeXRlcyA9IGh1bWFuaXplQnl0ZXM7XG4gICAgLy9jb25zb2xlLmxvZygndGhpcy5kb21haW4nKTtcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuZG9tYWluKTtcbiAgfVxuXG4gIG9uVXBsb2FkT3V0cHV0KHVwbG9hZE91dHB1dDogVXBsb2FkT3V0cHV0LCBhcnJheXZhbHVlOiBhbnksIHVwbG9hZHR5cGVjOiBhbnksIHVwbG9hZHBhdGg6IGFueSk6IHZvaWQge1xuICAgIC8vIHRoaXMudXBsb2FkZXJJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgaWYgKHVwbG9hZE91dHB1dC50eXBlID09PSAnYWxsQWRkZWRUb1F1ZXVlJykge1xuICAgICAgY29uc3QgZXZlbnQ6IFVwbG9hZElucHV0ID0ge1xuICAgICAgICB0eXBlOiAndXBsb2FkQWxsJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2RldmVsb3BtZW50YXBpLmF1ZGlvZGVhZGxpbmUuY29tOjcwMzEvdXBsb2FkcycsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7IHBhdGg6IHVwbG9hZHBhdGggfVxuICAgICAgfTtcbiAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdChldmVudCk7XG4gICAgfSBlbHNlIGlmICh1cGxvYWRPdXRwdXQudHlwZSA9PT0gJ2FkZGVkVG9RdWV1ZScgJiYgdHlwZW9mIHVwbG9hZE91dHB1dC5maWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHVwbG9hZE91dHB1dC5maWxlLnJlc3BvbnNlICE9ICcnKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKHVwbG9hZE91dHB1dC5maWxlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuZmlsZXMqKioqKioqKionKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5maWxlcyk7XG4gICAgICAgIHRoaXMubGVuZ3RoaXMgPSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5wZXJjZW50YWdlaXMgPSB0aGlzLmZpbGVzWzBdLnByb2dyZXNzLmRhdGEucGVyY2VudGFnZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVwbG9hZE91dHB1dC50eXBlID09PSAndXBsb2FkaW5nJyAmJiB0eXBlb2YgdXBsb2FkT3V0cHV0LmZpbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsZXMuZmluZEluZGV4KGZpbGUgPT4gdHlwZW9mIHVwbG9hZE91dHB1dC5maWxlICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlLmlkID09PSB1cGxvYWRPdXRwdXQuZmlsZS5pZCk7XG4gICAgICB0aGlzLmZpbGVzW2luZGV4XSA9IHVwbG9hZE91dHB1dC5maWxlO1xuICAgICAgdGhpcy5sZW5ndGhpcyA9IHRoaXMuZmlsZXMubGVuZ3RoO1xuICAgICAgaWYodGhpcy5maWxlc1swXSE9bnVsbCAmJiB0aGlzLmZpbGVzWzBdLnByb2dyZXNzIT1udWxsKVxuICAgICAgICB0aGlzLnBlcmNlbnRhZ2VpcyA9IHRoaXMuZmlsZXNbMF0ucHJvZ3Jlc3MuZGF0YS5wZXJjZW50YWdlO1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuZmlsZXM9PT09PT09PT09PT09PT09PT0nKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmlsZXMpO1xuICAgIH0gZWxzZSBpZiAodXBsb2FkT3V0cHV0LnR5cGUgPT09ICdyZW1vdmVkJykge1xuICAgICAgdGhpcy5maWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlOiBVcGxvYWRGaWxlKSA9PiBmaWxlICE9PSB1cGxvYWRPdXRwdXQuZmlsZSk7XG4gICAgfSBlbHNlIGlmICh1cGxvYWRPdXRwdXQudHlwZSA9PT0gJ2RyYWdPdmVyJykge1xuICAgICAgdGhpcy5kcmFnT3ZlciA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh1cGxvYWRPdXRwdXQudHlwZSA9PT0gJ2RyYWdPdXQnKSB7XG4gICAgICB0aGlzLmRyYWdPdmVyID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh1cGxvYWRPdXRwdXQudHlwZSA9PT0gJ2Ryb3AnKSB7XG4gICAgICB0aGlzLmRyYWdPdmVyID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdmaWxlcycpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlsZXMpO1xuICAgIGlmKHRoaXMuZmlsZXNbMF0hPW51bGwgJiYgdGhpcy5maWxlc1swXS5wcm9ncmVzcyE9bnVsbCkge1xuICAgICAgaWYodGhpcy5wcm9ncmVzc1thcnJheXZhbHVlXT09bnVsbCl0aGlzLnByb2dyZXNzW2FycmF5dmFsdWVdPTA7XG4gICAgICB0aGlzLmlucHJvZ3Jlc3M9dHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCdmaWxlIHVwbG9hZCBwcm9ncmVzc2luZycpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5maWxlc1swXS5wcm9ncmVzcy5kYXRhLnBlcmNlbnRhZ2UpO1xuICAgICAgdGhpcy5wcm9ncmVzc1thcnJheXZhbHVlXSA9ICh0aGlzLmZpbGVzWzBdLnByb2dyZXNzLmRhdGEucGVyY2VudGFnZSk7XG4gICAgICBpZih0aGlzLnByb2dyZXNzW2FycmF5dmFsdWVdPT0xMDApIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1thcnJheXZhbHVlXT1udWxsO1xuICAgICAgICB0aGlzLmlucHJvZ3Jlc3M9bnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnVwbG9hZHR5cGUgaW4gYXBpIHNlcnZpY2UnKTtcbiAgICAgIGNvbnNvbGUubG9nKHVwbG9hZHR5cGVjKTtcbiAgICB9XG4gICAgaWYgKHVwbG9hZHR5cGVjPT0nc2luZ2xlJyl7XG4gICAgICAvLyB0aGlzLmZpbGVzZXJ2ZXJuYW1lID0gW107XG4gICAgICBpZih0aGlzLmZpbGVzZXJ2ZXJuYW1lW2FycmF5dmFsdWVdID09IG51bGwpIHRoaXMuZmlsZXNlcnZlcm5hbWVbYXJyYXl2YWx1ZV09W107XG4gICAgICB0aGlzLmZpbGVzZXJ2ZXJuYW1lW2FycmF5dmFsdWVdPVtdO1xuICAgICAgaWYodGhpcy5maWxlc1swXS5yZXNwb25zZSE9bnVsbCkgdGhpcy5maWxlc2VydmVybmFtZVthcnJheXZhbHVlXS5wdXNoKHRoaXMuZmlsZXNbMF0ucmVzcG9uc2UpO1xuICAgIH1cbiAgICBpZiAodXBsb2FkdHlwZWMgPT0gJ211bHRpcGxlJykge1xuICAgICAgY29uc29sZS5sb2coJ3RoaXMuZmlsZXNbMF0ucmVzcG9uc2UnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZmlsZXNbMF0ucmVzcG9uc2UpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5maWxlcy5sZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5maWxlcyk7XG4gICAgICBpZiAodGhpcy5maWxlc2VydmVybmFtZVthcnJheXZhbHVlXSA9PSBudWxsKSB0aGlzLmZpbGVzZXJ2ZXJuYW1lW2FycmF5dmFsdWVdID0gW107XG4gICAgICAvLyBpZih0aGlzLmZpbGVzWzBdLnJlc3BvbnNlIT1udWxsKXtcbiAgICAgIGlmKHRoaXMuZmlsZXMubGVuZ3RoPT0xKSB7XG4gICAgICAgIGlmKHRoaXMuZmlsZXNbMF0gJiYgdGhpcy5maWxlc1swXS5yZXNwb25zZSE9bnVsbCAmJiB0aGlzLmZpbGVzWzBdLnJlc3BvbnNlLmVycm9yX2NvZGU9PW51bGwgKSB7XG4gICAgICAgICAgdGhpcy5maWxlc2VydmVybmFtZVthcnJheXZhbHVlXS5wdXNoKHRoaXMuZmlsZXNbMF0ucmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgICB0aGlzLnVwbG9hZGVycm9yPScnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZmlsZXNbMF0gIT1udWxsICYmIHRoaXMuZmlsZXNbMF0ucmVzcG9uc2UhPW51bGwgJiYgdGhpcy5maWxlc1swXS5yZXNwb25zZS5lcnJvcl9jb2RlIT1udWxsKXtcbiAgICAgICAgICB0aGlzLnVwbG9hZGVycm9yPSdlcnJvciBvY2N1cmVkIG9uIHVwbG9hZGluZyAhISEnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZih0aGlzLmZpbGVzLmxlbmd0aD4xKVxuICAgICAge1xuICAgICAgICBjb25zb2xlLmxvZygnc2RmZHNmPT09PSBpbiBtdWx0aXBsZSBsZW5ndGggJyk7XG4gICAgICAgIGZvcihsZXQgYiBpbiB0aGlzLmZpbGVzKXtcbiAgICAgICAgICBpZih0aGlzLmZpbGVzW2JdLnJlc3BvbnNlIT1udWxsICYmIHRoaXMuZmlsZXNbYl0ucmVzcG9uc2UuZXJyb3JfY29kZT09bnVsbCkge1xuICAgICAgICAgICAgdGhpcy5maWxlc2VydmVybmFtZVthcnJheXZhbHVlXS5wdXNoKHRoaXMuZmlsZXNbYl0ucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbGVzPVtdO1xuICAgICAgfVxuICAgICAgLy99XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCd0aGlzLmZpbGVzZXJ2ZXJuYW1lJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5maWxlc2VydmVybmFtZSk7XG4gICAgY29uc29sZS5sb2codGhpcy51cGxvYWRlcnJvcik7XG4gICAgLy90aGlzLnVwbG9hZGVyc2VydmljZS5maWxlbmFtZXZhbGMxPXRoaXMuZmlsZXNlcnZlcm5hbWU7XG4gICAgLy9VcGxvYWRlckNvbXBvbmVudC5maWxlbmFtZXZhbGMxPTg3O1xuICAgIC8vY29uc29sZS5sb2coY2xhc3N2YWwpO1xuXG4gIH1cbiAgaXNUb2tlbkV4cGlyZWQoKSB7XG5cbiAgICAvLyBjb25zdCBoZWxwZXIgPSBuZXcgSnd0SGVscGVyU2VydmljZSgpO1xuICAgIC8vIGNvbnN0IGRlY29kZWRUb2tlbiA9IGhlbHBlci5kZWNvZGVUb2tlbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKSk7XG4gICAgLy8gdmFyIGlzSWRUb2tlbkV4cGlyZWQgPSBoZWxwZXIuaXNUb2tlbkV4cGlyZWQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWZyZXNoX3Rva2VuJyxsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaF90b2tlbicpKVxuICAgIC8vIGNvbnN0IGlzUmVmcmVzaFRva2VuRXhwaXJlZCA9IGhlbHBlci5pc1Rva2VuRXhwaXJlZChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaF90b2tlbicpKTtcbiAgICAvLyBjb25zb2xlLmxvZygnaWRfdG9rZW4gaXNFeHBpcmVkOicsaXNJZFRva2VuRXhwaXJlZClcbiAgICAvLyBjb25zb2xlLmxvZygncmVmcmVzaF90b2tlbiBpc0V4cGlyZWQ6Jyxpc1JlZnJlc2hUb2tlbkV4cGlyZWQpXG5cblxuXG4gIH1cblxuICBnZXRjbGllbnRpcCgpIHtcblxuICAgIGNvbnNvbGUubG9nKCdlbmRwb2ludCcpO1xuXG4gICAgLy8gdGhpcy5pc1Rva2VuRXhwaXJlZCgpXG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAuZ2V0KFwiaHR0cDovL2lwaW5mby5pby8/Zm9ybWF0PWpzb24mdG9rZW49OTc5N2M0MmI5MzA3OGFcIikucGlwZShtYXAocmVzID0+IHJlcykpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cblxuICBnZXRFbmRwb2ludChlbmRwb2ludDogYW55KSB7XG5cbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogJydcbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnZW5kcG9pbnQnKTtcbiAgICBjb25zb2xlLmxvZyhlbmRwb2ludCk7XG4gICAgY29uc29sZS5sb2coJ2h0dHBPcHRpb25zJyk7XG4gICAgY29uc29sZS5sb2coaHR0cE9wdGlvbnMpO1xuICAgIGNvbnNvbGUubG9nKCcnKTtcblxuICAgIC8vIHRoaXMuaXNUb2tlbkV4cGlyZWQoKVxuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QoJycgKyBlbmRwb2ludC5zb3VyY2UsIHt9LCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldERhdGEoZW5kcG9pbnQ6IGFueSkge1xuXG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6ICcnXG4gICAgICB9KVxuICAgIH07XG4gICAgY29uc29sZS5sb2coJ2VuZHBvaW50Jyk7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKCdodHRwT3B0aW9ucycpO1xuICAgIGNvbnNvbGUubG9nKGh0dHBPcHRpb25zKTtcbiAgICBjb25zb2xlLmxvZygnJyk7XG5cbiAgICAvLyB0aGlzLmlzVG9rZW5FeHBpcmVkKClcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KCcnICsgJ2RhdGFsaXN0JywgZW5kcG9pbnQsIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gZ2V0RGF0YSBlbmRcblxuICBwb3N0RGF0YShlbmRwb2ludDphbnksIGRhdGEpIHtcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogJydcbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgY29uc29sZS5sb2coJ2VuZHBvaW50Jyk7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKCdodHRwT3B0aW9ucycpO1xuICAgIGNvbnNvbGUubG9nKGh0dHBPcHRpb25zKTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KHRoaXMuZ2V0RW5kcG9pbnRVcmwoZW5kcG9pbnQpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHBvc3REYXRhd2l0aG91dFRva2VuKGVuZHBvaW50OmFueSwgZGF0YSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgY29uc29sZS5sb2coJ2VuZHBvaW50Jyk7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QodGhpcy5nZXRFbmRwb2ludFVybChlbmRwb2ludCksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwb3N0bG9naW4oZW5kcG9pbnQ6YW55LCBkYXRhKSB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSlcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICBjb25zb2xlLmxvZygnZW5kcG9pbnQnKTtcbiAgICBjb25zb2xlLmxvZyhlbmRwb2ludCk7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAucG9zdCh0aGlzLmdldEVuZHBvaW50VXJsKGVuZHBvaW50KSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBwb3N0RGF0YSBlbmRcblxuXG5cblxuICBwb3N0U2VhcmNoKCBsaW5rLHRva2VuLHNvdXJjZSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICB9KVxuICAgIH07XG4gICAgY29uc29sZS5sb2coJy0tLS0tLSAnKTtcbiAgICBjb25zb2xlLmxvZyhcImxpbmsgaW4gcG9zdFNlYXJjaFwiKTtcbiAgICBjb25zb2xlLmxvZyhsaW5rKTtcbiAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QobGluaywgc291cmNlLCBodHRwT3B0aW9ucykucGlwZShtYXAocmVzID0+IHJlcykpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbnBvc3RTZWFyY2gxKCBsaW5rLHNvdXJjZSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHNvdXJjZS50b2tlblxuICAgICAgfSlcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0gJyk7XG4gICAgY29uc29sZS5sb2coXCJsaW5rXCIpO1xuICAgIGNvbnNvbGUubG9nKGxpbmspO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QobGluaywgc291cmNlKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cblxuXG5cbiAgcHV0RGF0YShlbmRwb2ludDphbnksIGRhdGEsIGlkOmFueSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnJ1xuICAgICAgfSlcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICBjb25zb2xlLmxvZyhcImVuZHBvaW50XCIpO1xuICAgIGNvbnNvbGUubG9nKGVuZHBvaW50KTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wdXQodGhpcy5nZXRFbmRwb2ludFVybChlbmRwb2ludCkrJy8nK2lkLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICBkZXRlT25lRGF0YShlbmRwb2ludDphbnksIGRhdGEsdG9rZW4sc291cmNlKSB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tICcpO1xuICAgIGNvbnNvbGUubG9nKFwiZW5kcG9pbnRcIik7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGxldCBkYXRhdmFsOmFueTtcbiAgICBkYXRhdmFsPXtzb3VyY2U6c291cmNlLGlkOmRhdGEuX2lkfVxuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QoZW5kcG9pbnQsZGF0YXZhbCwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgICB0b2dnbGVzdGF0dXMoZW5kcG9pbnQ6YW55LCBkYXRhLHRva2VuLHNvdXJjZSkge1xuICAgICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuXG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tICcpO1xuICAgIGNvbnNvbGUubG9nKFwiZW5kcG9pbnRcIik7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGxldCBkYXRhdmFsOmFueTtcbiAgICBkYXRhdmFsPXtzb3VyY2U6c291cmNlLGRhdGE6ZGF0YX1cbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faHR0cC5wb3N0KGVuZHBvaW50LGRhdGF2YWwsIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGRldGVNYW55RGF0YShlbmRwb2ludDphbnksIGRhdGEsdG9rZW4sc291cmNlKSB7XG4gICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnYWNjZXNzLXRva2VuJzogdG9rZW5cbiAgICAgIH0pXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tICcpO1xuICAgIGNvbnNvbGUubG9nKFwiZW5kcG9pbnRcIik7XG4gICAgY29uc29sZS5sb2coZW5kcG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGxldCBkYXRhdmFsOmFueTtcbiAgICBkYXRhdmFsPXtzb3VyY2U6c291cmNlLGlkczpkYXRhfVxuICAgIHZhciByZXN1bHQgPSB0aGlzLl9odHRwLnBvc3QoZW5kcG9pbnQrJ21hbnknLGRhdGF2YWwsIGh0dHBPcHRpb25zKS5waXBlKG1hcChyZXMgPT4gcmVzKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gICAgdG9nZ2xlc3RhdHVzbWFueShlbmRwb2ludDphbnksIGRhdGEsdmFsLHRva2VuLHNvdXJjZSkge1xuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ2FjY2Vzcy10b2tlbic6IHRva2VuXG4gICAgICB9KVxuICAgIH07XG4gICAgY29uc29sZS5sb2coJy0tLS0tLSAnKTtcbiAgICBjb25zb2xlLmxvZyhcImVuZHBvaW50XCIpO1xuICAgIGNvbnNvbGUubG9nKGVuZHBvaW50KTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBsZXQgZGF0YXZhbDphbnk7XG4gICAgZGF0YXZhbD17c291cmNlOnNvdXJjZSxkYXRhOntpZHM6ZGF0YSx2YWw6dmFsfX07XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2h0dHAucG9zdChlbmRwb2ludCsnbWFueScsZGF0YXZhbCwgaHR0cE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiByZXMpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuXG4gIHByaXZhdGUgZ2V0RW5kcG9pbnRVcmwoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgICAgcmV0dXJuICcnICsgZW5kcG9pbnQ7XG4gIH1cblxufVxuIl19