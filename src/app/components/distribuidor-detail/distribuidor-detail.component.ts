import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from  '../../services/user.service';
import { DistribuidorService } from '../../services/distribuidor.service';
import { Distribuidor } from '../../models/distribuidor';
import { global } from '../../services/global';

@Component({
  selector: 'app-distribuidor-detail',
  templateUrl: './distribuidor-detail.component.html',
  styleUrls: ['./distribuidor-detail.component.css'],
  providers: [UserService, DistribuidorService]
})
export class DistribuidorDetailComponent implements OnInit{

  markers: marker[] = [
    {
      nombre: 'Cordoba',
      lat: 18.8997709,
      lng: -96.9685095,
      arrastrable: true
    },
    {
      nombre: 'ORIZABA',
      lat: 18.8552386,
      lng: -97.0763362,
      arrastrable: true
    },
    {
      nombre: 'XALAPA LAS AMÃ‰RICAS',
      lat: 19.5151715,
      lng: -96.8801199,
      arrastrable: false
    }
  ];

  public title: string;
  public identity;
  public token;
  public distribuidor: Distribuidor;
  public status:string;

  public lat: number;
  public lng: number;
  public zoom: number;
  public url: string;

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
    this.zoom = 15;
   }

  ngOnInit() {
    this.obtenerUbicacionActual();
  }

  iconMap = {
    iconUrl: global.url+"user/avatar/favicon.ico",
    iconEight: 15
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;

    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();


    this._distribuidorService.getDistribuidor(this.token, address.geometry.location).subscribe(
      Response => {
        if(Response.status == 'success'){
          this.distribuidor = Response.distribuidores;
          this.status = 'success';

          console.log(Response.distribuidores);

          //this._router.navigate(['/home']);
        }else{
          this.status = 'error';
          console.log("despuesd de aqui2");
        }
      },
      error =>{
        this.status = 'error ';
        console.log(<any>error);
      }
    );
  }

  public obtenerUbicacionActual(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        Response =>{
          //alert("Latitud:"+Response.coords.latitude + - + "Longitud:" + Response.coords.longitude);
          this.lat = Response.coords.latitude;
          this.lng = Response.coords.longitude;
        },
        error => {
          alert('algo salio mal');
        }
      );
    }else{
      console.log('no soportado');
    }
  }

  

}
