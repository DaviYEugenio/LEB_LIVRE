
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-footer',
  templateUrl: './footer_page.component.html',
  styleUrls: ['./footer_page.component.scss'],
})
export class NewFooterComponent {
  LinkFacebook(){
    window.open("https://www.facebook.com/editoradobrasil", "_blank");
  }
  LinkYoutube(){
    window.open("https://www.youtube.com/user/EditoradoBrasil", "_blank");
  }
  LinkInstagram(){
    window.open("https://www.instagram.com/EditoradoBrasil", "_blank");
  }

}
