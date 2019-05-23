import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PostsService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreatComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  isLoding = false;
  post: Post;

  constructor(public postService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((parmaMap: ParamMap) => {
      if (parmaMap.has('postId')) {
        this.mode = 'edit';
        this.postId = parmaMap.get('postId');
        this.isLoding = true;
        this.postService.getPost(this.postId)
          .subscribe(serverdata => {
            this.isLoding = false;
            this.post = {
              id: serverdata._id,
              title: serverdata.title,
              content: serverdata.content};
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.isLoding = true;
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }

}
