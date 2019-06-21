import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService} from '../../services/post.service';
import { UserService} from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public url;
  public posts: Array<Post>;
  public user: User;
  public identity;
  public token;

  constructor(
    private _postService:PostService,
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.url=global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    //Sacar el id del post de la Url
    this._route.params.subscribe(params => {
      let userId = +params['id']; //el + es para convertir el string a num
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      Response => {
        if(Response.status == 'success'){
          this.user = Response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPosts(userId){
    this._userService.getPost(userId).subscribe(
      Response => {
        if(Response.status == 'success'){
          this.posts = Response.posts;
          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response =>{
        this.getProfile();
      }, 
      error =>{
        console.log(error);
      }
    );
  }

}
