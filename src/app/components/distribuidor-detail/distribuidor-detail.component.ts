import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distribuidor-detail',
  templateUrl: './distribuidor-detail.component.html',
  styleUrls: ['./distribuidor-detail.component.css']
})
export class DistribuidorDetailComponent implements OnInit {

  public title: string;
  public lat: string;
  public lng: string;

  formattedAddress = '';
  options = {
    componentRestrictions: {
      country: ['MX'] 
    }
  }

  constructor() {
    this.title = "Detalles del Distribuidor";
   }

  ngOnInit() {
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
  }

}
