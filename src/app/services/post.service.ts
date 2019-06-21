import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //impor para poder enviar cabezera
import{ Observable, observable } from 'rxjs'; //importart trbajar con los datos que nos devuelve el api
import { Post } from '../models/post';
import { global } from './global';
import { identifierModuleUrl } from '@angular/compiler';

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
		// Limpiar campo content (editor texto enriquecido) htmlEntities a utf-8
		post.content = global.htmlEntities(post.content);

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

	update(token, post, id):Observable<any>{
		// Limpiar campo content (editor texto enriquecido) htmlEntities a utf-8
		post.content = global.htmlEntities(post.content);

		
		let json = JSON.stringify(post);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
																	 .set('Authorization', token);

		return  this._http.put(this.url + 'post/' + id, params, {headers:headers});
	}

	delete(token, id):Observable<any>{
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
																	 .set('Authorization', token);

		return  this._http.delete(this.url + 'post/' + id, {headers:headers});
	}

}