import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list/list.service';
import { Contact } from '../list/contact';
import { ChatService } from './chat.service';
import { IChat } from './IChat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  contact: Contact;
  contactId: number;
  chats: IChat[];
  newMessage: IChat;
  currentMessage: String;

  constructor(private route: ActivatedRoute, private listService: ListService, private chatService: ChatService, private router: Router) { 
    this.currentMessage = "";
  }

  onBack(): void{
   this.router.navigate(['/list']); 
  }

  addChat(): void{
    this.newMessage = {
      "id":this.chats.length+1,
      "message": this.currentMessage,
      "status": "sent"
    };
    this.chats.push(this.newMessage);
  }

  ngOnInit(): void {
    this.contactId = +this.route.snapshot.paramMap.get("id");
    this.listService.getContact(this.contactId).subscribe({
      next: contact=>{
        this.contact = contact;
      },
      error: err=> console.error(err)
    });
    this.chatService.getChats().subscribe({
      next: chats=>{
        this.chats = chats;
        console.log(this.chats);
      },
      error: err=> console.error(err)
    });
  }
}
