import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
//import { post } from 'selenium-webdriver/http';
 
@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public status;
  public is_edit: boolean;
  public url: string;

  public froala_options: Object = {
    charCounterCount: true,
    languaje: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
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
    private _postService: PostService,
    
  ) {
    this.page_title = "Editar Entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.url = global.url;
   }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    //console.log(this.post);
    this.getPost();
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

  getPost(){
    //Sacar el id del post de la Url
    this._route.params.subscribe(params => {

     let id = +params['id']; //el + es para convertir el string a num
     //console.log(id);

      //peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.posts;

            if(this.post.user_id != this.identity.sub){
              this._router.navigate(['/inicio']);
            }

          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
     });
  }

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      Response =>{
        if(Response.status == 'success'){
          
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
