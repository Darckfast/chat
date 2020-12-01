import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatRoomService } from 'src/app/services/chat-room.service'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  providers: [ChatRoomService]
})
export class ChatRoomComponent implements OnInit {
  inputMessageForm: FormGroup;

  public static userId: string;

  messages: Array<{
    text: string,
    self: boolean
  }> = [];

  constructor (private formBuilder: FormBuilder, private chatRoomService: ChatRoomService) {
    this.inputMessageForm = this.formBuilder.group({
      text: ['', Validators.required]
    })
  }

  ngOnInit (): void {
    this.chatRoomService.initConn()
    this.chatRoomService.getMessages(this.messages)
  }

  get text () {
    return this.inputMessageForm.get('text')
  }

  sendMessage (): void {
    if (this.inputMessageForm.valid) {
      this.chatRoomService.sendMessage(this.text.value)
      this.text.setValue('')
    }
  }
}
