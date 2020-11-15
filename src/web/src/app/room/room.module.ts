import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [ChatRoomComponent];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ReactiveFormsModule
  ]
})
export class RoomModule { }
