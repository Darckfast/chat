import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  inputMessageForm: FormGroup;

  messages: Array<{
    text: string,
    self: boolean
  }> = [];

  constructor(private formBuilder: FormBuilder) {
    this.inputMessageForm = this.formBuilder.group({
      text: ['', Validators.required]
    });

    this.messages.push(...[
      {
        text: 'Hello friend',
        self: false,
      },
      {
        text: 'Hello friend...',
        self: false,
      },
      {
        text: 'thats lame',
        self: false,
      },
      {
        text: 'maybe i should give you a name',
        self: false,
      },
      {
        text: '...',
        self: true,
      }
    ])
  }

  ngOnInit(): void {
  }

  get text() {
    return this.inputMessageForm.get('text');
  }

  sendMessage(): void {
    if (this.inputMessageForm.valid) {
      this.messages.push({
        text: this.text.value,
        self: true
      });

      this.text.setValue('');

      //Send to the backend
    }
  }

}
