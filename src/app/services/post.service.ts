import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //impor para poder enviar cabezera
import{ Observable } from 'rxjs'; //importart trbajar con los datos que nos devuelve el api
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
    }
    pruebas(){
        return "Hola desde el servicio de entradas!!";
	}
	
	create(token, post):Observable<any>{
		let json = JSON.stringify(post);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
										.set('Authorization', token);

		return this._http.post(this.url + 'post', params, {headers:headers});
	}

	getPosts():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		return this._http.get(this.url + 'post', {headers: headers});
	}

	getPost(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		
		return this._http.get(this.url + 'post/' + id, {headers: headers});
	}
}