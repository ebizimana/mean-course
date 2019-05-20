import { Component, Output, EventEmitter } from '@angular/core';

import {Post } from '../post.model'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreatComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreate = new EventEmitter<Post>();

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle, content: this.enteredContent
    };
    this.postCreate.emit(post);
  }

}
