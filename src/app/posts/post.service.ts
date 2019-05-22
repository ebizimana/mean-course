import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/post')
    .subscribe((serverPosts) => {
      this.posts = serverPosts.posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string}>('http://localhost:3000/api/post', post)
    .subscribe((serverResponse) => {
      console.log(serverResponse.message);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }
}
