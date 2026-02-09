export interface Transaction {
    id: string;
    studentName: string;
    courseName: string;
    amount: number;
    platformFee: number; // 20%
    teacherEarnings: number; // 80%
    date: string;
    status: 'Completado' | 'Reembolsado';
}

export interface TeacherPayout {
    id: string;
    teacherName: string;
    teacherId: string;
    pendingAmount: number;
    totalPaid: number;
    lastPayoutDate?: string;
    status: 'Pendiente' | 'Pagado';
}

export interface FinancialStats {
    totalRevenue: number;     // Gross volume
    platformProfit: number;   // Net profit (20%)
    pendingPayouts: number;   // Amount waiting to be paid to teachers
}
