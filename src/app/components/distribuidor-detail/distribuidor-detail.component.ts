import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from  '../../services/user.service';
import { DistribuidorService } from '../../services/distribuidor.service';
import { Distribuidor } from '../../models/distribuidor';

@Component({
  selector: 'app-distribuidor-detail',
  templateUrl: './distribuidor-detail.component.html',
  styleUrls: ['./distribuidor-detail.component.css'],
  providers: [UserService, DistribuidorService]
})
export class DistribuidorDetailComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public distribuidor: Distribuidor;
  public status:string;

  public lat: string;
  public lng: string;

  formattedAddress = '';
  options = {
    componentRestrictions: {
      country: ['MX'] 
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _distribuidorService: DistribuidorService
  ) {
    this.title = "Detalles del Distribuidor";
    this.token = this._userService.getToken();
    this.distribuidor = new  Distribuidor(1, '', '');
   }

  ngOnInit() {
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();


    this._distribuidorService.getDistribuidor(this.token, address.geometry.location).subscribe(
      Response => {
        console.log('repuesta: '+Response.status);
        if(Response.status == 'success'){
          this.distribuidor = Response.distribuidor;
          this.status = 'success';

          console.log("despuesd de aqui1");

          //this._router.navigate(['/home']);
        }else{
          this.status = 'error';
          console.log("despuesd de aqui2");
        }
      },
      error =>{
        console.log(this.status = 'error');
        console.log(<any>error);
      }
    );


  }

}
