import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DistribuidorService } from '../../services/distribuidor.service';
import { global } from '../../services/global';
import { Distribuidor } from '../../models/distribuidor';

@Component({
  selector: 'app-new-distribuidor',
  templateUrl: './new-distribuidor.component.html',
  styleUrls: ['./new-distribuidor.component.css'],
  providers: [UserService, DistribuidorService]
})
export class NewDistribuidorComponent implements OnInit {
  public title:string;
  public identity;
  public token;
  public status;
  public distribuidor:Distribuidor;
  public mensaje_backend:string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _distribuidroService: DistribuidorService) {
      this.title = "Nuevo Distribuidor"
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.distribuidor = new  Distribuidor(1, '', '');
  }

  onSubmit(form){
    console.log("en sonsubmit"+form);
    this._distribuidroService.create(this.token, this.distribuidor).subscribe(
      Response =>{
          this.mensaje_backend = Response.message;
          console.log(Response.message);
        if(Response.status == 'success'){
          this.distribuidor = Response.distribuidor;
          this.status = 'success';
          
          this._router.navigate(['/distribuidor']);
        }else{
          this.status = 'error';
          this.mensaje_backend = Response.message;
          console.log(Response.message);
        }
      },
      error => {
        
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
