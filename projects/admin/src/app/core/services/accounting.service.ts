import { Injectable, signal, computed } from '@angular/core';
import { Transaction, TeacherPayout, FinancialStats } from '../interfaces/accounting.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountingService {
    // Señal para la lista de transacciones simuladas
    private _transactions = signal<Transaction[]>([
        {
            id: 'TX-001', studentName: 'Ana García', courseName: 'Angular 21 Masterclass',
            amount: 99.99, platformFee: 20, teacherEarnings: 79.99, date: '2026-02-01', status: 'Completado'
        },
        {
            id: 'TX-002', studentName: 'Carlos López', courseName: 'Tailwind CSS Pro',
            amount: 49.50, platformFee: 9.90, teacherEarnings: 39.60, date: '2026-02-02', status: 'Completado'
        },
        {
            id: 'TX-003', studentName: 'Lucía Méndez', courseName: 'React for Enterprise',
            amount: 149.00, platformFee: 29.80, teacherEarnings: 119.20, date: '2026-02-03', status: 'Completado'
        },
        {
            id: 'TX-004', studentName: 'Miguel Ángel', courseName: 'Angular 21 Masterclass',
            amount: 99.99, platformFee: 20, teacherEarnings: 79.99, date: '2026-02-05', status: 'Completado'
        }
    ]);

    // Señal para el estado de los pagos a profesores
    private _payouts = signal<TeacherPayout[]>([
        {
            id: 'P-001', teacherName: 'Juan Pérez', teacherId: 'T01',
            pendingAmount: 159.98, totalPaid: 1200.50, status: 'Pendiente'
        },
        {
            id: 'P-002', teacherName: 'Clara Soto', teacherId: 'T02',
            pendingAmount: 39.60, totalPaid: 450.00, status: 'Pendiente'
        }
    ]);

    // Exponemos señales de lectura
    public transactions = computed(() => this._transactions());
    public payouts = computed(() => this._payouts());

    // Estadísticas computadas en tiempo real
    public stats = computed<FinancialStats>(() => {
        const txs = this._transactions();
        //array.reduce((acumulador, elementoActual) => { ... }, valorInicial)
        const pending = this._payouts().reduce((acc, p) => acc + p.pendingAmount, 0);

        const totalRev = txs.reduce((acc, t) => acc + t.amount, 0);
        const profit = txs.reduce((acc, t) => acc + t.platformFee, 0);

        return {
            totalRevenue: totalRev,
            platformProfit: profit,
            pendingPayouts: pending
        };
    });

    // Acción: Procesar un pago a un profesor
    processPayout(payoutId: string) {
        this._payouts.update(payouts =>
            payouts.map(p => {
                if (p.id === payoutId) {
                    return {
                        ...p,
                        totalPaid: p.totalPaid + p.pendingAmount,
                        pendingAmount: 0,
                        status: 'Pagado',
                        lastPayoutDate: new Date().toISOString().split('T')[0]
                    };
                }
                return p;
            })
        );
    }
}
