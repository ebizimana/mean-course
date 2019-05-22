import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPost() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/post')

    // To convert "_id" from the db model to "id" to be used for angular model
    .pipe(map((serverPosts) => {
      return serverPosts.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))

    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
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
