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

  // Get all post from the server and update all components
  getPosts() {
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

  // Retrive one post by id
  getPost(postId: string) {
    return {...this.posts.find(p => p.id === postId)};
  }

  // Update component that are subcribe to the posts array
  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  // Send the new added post to the server
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

  // Update a post with new content to the server
  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/post/' + id, post)
    .subscribe(result => console.log(result));
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
