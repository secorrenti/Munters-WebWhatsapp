import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatGuard } from './chat.guard';
import { GeneralComponent } from './general/general.component';
import { RoomComponent } from './room/room.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationGuard } from './conversation/conversation.guard';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [ChatGuard], canDeactivate: [ChatGuard],
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralComponent },
      { path: 'room', component: RoomComponent },
      { path: 'conversation/:userId', component: ConversationComponent, canActivate: [ConversationGuard] },
      { path: '**', redirectTo: 'room' },
    ]
  },
];

@NgModule({
  providers: [ChatGuard, ConversationGuard],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
