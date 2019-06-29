import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //impor para poder enviar cabezera
import{ Observable } from 'rxjs'; //importart trbajar con los datos que nos devuelve el api
import { Distribuidor } from '../models/distribuidor';
import { global } from './global';

@Injectable()
export class DistribuidorService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
    }

    getDistribuidor(token, datosDistribuidor):Observable<any>{
        let json = JSON.stringify(datosDistribuidor);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        return this._http.post(this.url + 'distribuidor', params, {headers:headers});
    }

}