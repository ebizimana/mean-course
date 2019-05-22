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
    this.http
    // Get posts from the server
    .get<{message: string, posts: any}>('http://localhost:3000/api/post')

    // Transoform posts to the Post.model.ts standard
    .pipe(map((serverPosts) => {
      return serverPosts.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    // subscribe to get updates in case of any change
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
    this.http
    .post<{message: string, postId: string}>('http://localhost:3000/api/post', post)
    .subscribe(serverResponse => {
      post.id = serverResponse.postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/post/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
