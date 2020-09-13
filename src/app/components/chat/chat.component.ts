import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private _chat : ChatService
  ) { }

  ngOnInit(): void {
    this.loadChats()
  }

  loadChats(){
    this._chat.getChats().subscribe((res:any)=>{
      console.log(res);
      
    })
  }
}
