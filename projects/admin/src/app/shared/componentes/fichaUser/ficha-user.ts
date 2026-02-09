import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@shared/interfaces/user.interface';
import { Role } from '@shared/models/role.enum';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-ficha-user',
    standalone: true,
    imports: [CommonModule, AvatarModule, TagModule, ButtonModule, DividerModule],
    templateUrl: './ficha-user.html',
    styleUrl: './ficha-user.scss'
})
export class FichaUser {
    user = input.required<User>();
    onClose = output<void>();

    getRoleLabel(role: Role): string {
        return role === Role.STUDENT ? 'Estudiante' : 'Formador';
    }

    getRoleSeverity(role: Role) {
        return role === Role.STUDENT ? 'info' : 'warn';
    }

    getStatusSeverity(isActive: boolean) {
        return isActive ? 'success' : 'danger';
    }

    close() {
        this.onClose.emit();
    }
}
