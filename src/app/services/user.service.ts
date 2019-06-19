import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //impor para poder enviar cabezera
import{ Observable } from 'rxjs'; //importart trbajar con los datos que nos devuelve el api
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
	public url:string;
	public identity;
	public token;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	test(){
		return "Hola mundo desde un servicio!";
	}

	register(user): Observable<any>{
		let json = JSON.stringify(user); //codificar los datos en JSON
		let params = 'json='+json; //pasar los parametros en JSON llamado json

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //tipo de peticion enviar datos de un form nomranl www
		return this._http.post(this.url+'register', params, {headers:headers}); //devolver la peticion ajax por el metodo POST
		//retorna a la url del backend y concatenando el metod register
	}

	signup(user, gettoken = null): Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}

		let json = JSON.stringify(user);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'login', params, {headers:headers});
	}

	update(token, user):Observable<any>{
		let json = JSON.stringify(user);
		let params =  "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

		return this._http.put(this.url + 'user/update', params, {headers:headers});
	}

	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != 'undefined'){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}
	getToken() {
		let token = localStorage.getItem('token');

		if(token &&token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}

}