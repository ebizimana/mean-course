import { Component } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'

})

export class PostCreatComponent {
  onAddPost(){
    alert("I am here")
  }

}
