import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
//import { post } from 'selenium-webdriver/http';
 
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public mensaje_backend;

  public froala_options: Object = {
    charCounterCount: true,
    languaje: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .fig, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'post/upload', // URL del valravel (web.php)
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = "Crear Entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    //console.log(this.post);
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      Response =>{
        if(Response.status == 'success'){
          this.categories = Response.categories;          
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      Response =>{
          this.mensaje_backend = Response.message;
          console.log(Response.message);
        if(Response.status == 'success'){
          this.post = Response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
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
