
import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    public notify = new Subject<any>();

    public responseCache = new Map();
    public apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient) {
    }
    getHttpRequest(path) {
        const url = this.apiUrl + path;
        return this.http.get(url);
    }
    postHttpRequest(path, body) {
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'cache-control': 'no-cache',
                    'accept': 'application/json'
                }
            )
        };
        return this.http.post(path, body, httpOptions);
    }
}

