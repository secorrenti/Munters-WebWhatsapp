import { Component, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

  @Output() whenSended = new EventEmitter<string>();
  myForm = new FormGroup({
    messageText: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  send() {
    if (this.myForm.valid) {
      this.whenSended.emit(this.myForm.controls.messageText.value);
      this.myForm.reset();
    }
  }

  keypress($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.send();
    }
  }
}
