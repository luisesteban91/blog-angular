import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'; //input comunicacion entre componentes(componente padre)

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteEntrada(postId){
    // Usamos el método emit
    this.delete.emit(postId);
  }

}
