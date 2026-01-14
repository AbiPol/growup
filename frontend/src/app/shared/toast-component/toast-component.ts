import { Component, inject } from '@angular/core';
import { MessageService, SharedModule } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'growup-toast-component',
  imports: [
    Toast,
    SharedModule
  ],
  templateUrl: './toast-component.html',
  providers: [],
  styles: ``,
})
export class ToastComponent {

  messageService = inject(MessageService);

  toastComponent = ToastComponent;

  show(severity: string, label: string, summary: string, detail: string) {
    this.messageService.add({ key: 'global-toast', severity: severity, summary: summary, detail: detail });
  }
}
