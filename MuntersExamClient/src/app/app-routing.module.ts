import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChatGuard } from './pages/chat/chat.guard';
import { ConversationGuard } from './pages/chat/conversation/conversation.guard';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule) },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'chat', },
];


@NgModule({
  providers: [ChatGuard, ConversationGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
