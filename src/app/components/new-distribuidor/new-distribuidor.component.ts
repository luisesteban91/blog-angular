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
}
