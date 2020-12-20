import { Injectable } from '@angular/core'
import { io } from 'socket.io-client'
import { v4 } from 'uuid'

export class Message {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private socket;
  public static userId = ''

  public messages: Array<{
    text: string,
    self: boolean
  }> = [];

  initConn () {
    this.socket = io('http://localhost:3000')
    this.joinChat()

    if (!ChatRoomService.userId) {
      ChatRoomService.userId = v4()
    }
  }

  getMessages (messageArray: Array<{
    text: string,
    self: boolean
  }>) {
    this.socket.on('message', (msgPayload) => {
      console.log(msgPayload)
      messageArray.push({
        self: msgPayload.owner === ChatRoomService.userId,
        text: msgPayload.message
      })
    })
  }

  joinChat () {
    this.socket.emit('joinChat')
  }

  sendMessage (message: string) {
    this.socket.emit('sendMessage', { message, userId: ChatRoomService.userId })
  }
}
