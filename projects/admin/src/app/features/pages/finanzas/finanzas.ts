import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingService } from '../../../core/services/accounting.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'growup-finanzas-page',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        TableModule,
        TabsModule,
        TagModule
    ],
    templateUrl: './finanzas.html'
})
export class FinanzasPage {
    public accountingService = inject(AccountingService);

    processPayout(payoutId: string) {
        this.accountingService.processPayout(payoutId);
    }
}
