import { User as SharedUser } from '@shared/interfaces/user.interface';

export interface DashboardStats {
    students: number;
    trainers: number;
    activeCourses: number;
    monthlyRevenue: string;
}

export interface PendingCourse {
    id: number;
    name: string;
    teacher: string;
    date: string;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING'
}

// Extendemos o usamos el User compartido si es necesario
export interface AdminUser extends SharedUser {
    status: UserStatus;
}