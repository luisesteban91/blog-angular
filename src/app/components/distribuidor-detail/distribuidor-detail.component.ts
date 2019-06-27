import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distribuidor-detail',
  templateUrl: './distribuidor-detail.component.html',
  styleUrls: ['./distribuidor-detail.component.css']
})
export class DistribuidorDetailComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = "Detalles del Distribuidor";
   }

  ngOnInit() {
  }

}
