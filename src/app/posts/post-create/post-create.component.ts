import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreatComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreate = new EventEmitter;

  onAddPost() {
    const post = {
      title: this.enteredTitle, content: this.enteredContent
    };
    this.postCreate.emit(post);
  }

}
