import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { RoomComponent } from './room/room.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatInputComponent } from 'src/app/widgets/chat-input/chat-input.component';
import { GeneralComponent } from './general/general.component';
import { ChatRoutingModule } from './chat-routing.module';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    RoomComponent,
    ConversationComponent,
    ChatInputComponent,
    GeneralComponent,
  ],
  imports: [
    ChatRoutingModule,
    WidgetsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule { }
