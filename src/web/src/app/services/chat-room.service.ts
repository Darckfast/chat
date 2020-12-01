import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { io } from 'socket.io-client'
import { ChatRoomComponent } from '../room/chat-room/chat-room.component'
import { v4 } from 'uuid'

export class Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private socket;
  public messages: Array<{
    text: string,
    self: boolean
  }> = [];

  constructor () { }

  initConn () {
    this.socket = io('http://localhost:3000')
    this.joinChat()

    if (!ChatRoomComponent.userId) {
      ChatRoomComponent.userId = v4()
    }
  }

  getMessages (messageArray: Array<{
    text: string,
    self: boolean
  }>) {
    this.socket.on('message', (msgPayload) => {
      console.log(msgPayload)
      messageArray.push({
        self: msgPayload.owner === ChatRoomComponent.userId,
        text: msgPayload.message
      })
    })
  }

  joinChat () {
    this.socket.emit('joinChat')
  }

  sendMessage (message: string) {
    this.socket.emit('sendMessage', { message, userId: ChatRoomComponent.userId })
  }
}
