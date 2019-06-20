import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService} from '../../services/post.service';
import { UserService} from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})

export class HomeComponent implements OnInit {
  public page_title:string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(
    private _postService:PostService,
    private _userService:UserService
  ) { 
    this.page_title = 'Incio';
    this.url=global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
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
}
