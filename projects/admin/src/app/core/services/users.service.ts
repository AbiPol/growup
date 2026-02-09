import { Injectable, signal, computed } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { Role } from '@shared/models/role.enum';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // Estado privado con señales
    private _users = signal<User[]>([
        // students (15)
        { id: '101', name: 'Ana Estudianta', email: 'ana@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-10-15' },
        { id: '102', name: 'Beto Estudiante', email: 'beto@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '103', name: 'Maria Estudianta', email: 'maria@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-10-15' },
        { id: '104', name: 'Pepe Estudiante', email: 'pepe@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '105', name: 'Manola Estudianta', email: 'manola@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-10-15' },
        { id: '106', name: 'Alberto Estudiante', email: 'alberto@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '107', name: 'Ruth Estudianta', email: 'ruth@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-10-15' },
        { id: '108', name: 'Manuel Estudiante', email: 'manuel@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '109', name: 'Sonia Estudianta', email: 'sonia@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-10-15' },
        { id: '110', name: 'Leo Estudiante', email: 'leo@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '111', name: 'Leonor Estudianta', email: 'leonor@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-11-20' },
        { id: '112', name: 'Hugo Estudiante', email: 'hugo@estudiante.com', isActive: true, role: Role.STUDENT, joinDate: '2025-12-01' },
        { id: '113', name: 'Isabel Estudianta', email: 'isabel@estudianta.com', isActive: true, role: Role.STUDENT, joinDate: '2025-12-05' },
        { id: '114', name: 'Javier Estudiante', email: 'javier@estudiante.com', isActive: false, role: Role.STUDENT, joinDate: '2025-12-10' },
        { id: '115', name: 'Koke Estudiante', email: 'koke@estudiante.com', isActive: true, role: Role.STUDENT, joinDate: '2025-12-12' },

        // teachers (15)
        { id: '201', name: 'Carlos Formador', email: 'carlos@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2024-05-10' },
        { id: '202', name: 'Diana Formadora', email: 'diana@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2025-01-05' },
        { id: '203', name: 'Eduardo Formador', email: 'edu@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2024-06-15' },
        { id: '204', name: 'Fabiola Formadora', email: 'fabi@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2024-07-20' },
        { id: '205', name: 'Gabriel Formador', email: 'gabriel@formador.com', isActive: false, role: Role.TEACHER, joinDate: '2024-08-10' },
        { id: '206', name: 'Helena Formadora', email: 'helena@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2024-09-05' },
        { id: '207', name: 'Ignacio Formador', email: 'ignacio@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2024-10-12' },
        { id: '208', name: 'Julia Formadora', email: 'julia@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2024-11-30' },
        { id: '209', name: 'Kevin Formador', email: 'kevin@formador.com', isActive: false, role: Role.TEACHER, joinDate: '2024-12-20' },
        { id: '210', name: 'Laura Formadora', email: 'laura@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2025-01-15' },
        { id: '211', name: 'Mario Formador', email: 'mario@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2025-01-20' },
        { id: '212', name: 'Nora Formadora', email: 'nora@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2025-02-01' },
        { id: '213', name: 'Oscar Formador', email: 'oscar@formador.com', isActive: false, role: Role.TEACHER, joinDate: '2025-02-05' },
        { id: '214', name: 'Paula Formadora', email: 'paula@formadora.com', isActive: true, role: Role.TEACHER, joinDate: '2025-02-10' },
        { id: '215', name: 'Quique Formador', email: 'quique@formador.com', isActive: true, role: Role.TEACHER, joinDate: '2025-02-06' },
    ]);

    //Usuarios de búsqueda
    private _usersSearch = signal<User[]>([]);

    // Señales derivadas para diferenciar claramente los roles
    public students = computed(() =>
        this._users().filter(u => u.role === Role.STUDENT)
    );

    public teachers = computed(() =>
        this._users().filter(u => u.role === Role.TEACHER)
    );

    //Señales de búsqueda
    public studentsSearch = computed(() =>
        this._usersSearch().filter(u => u.role === Role.STUDENT));

    public teachersSearch = computed(() =>
        this._usersSearch().filter(u => u.role === Role.TEACHER));

    // Totales computados
    public totalStudents = computed(() => this.students().length);
    public totalTeachers = computed(() => this.teachers().length);

    findUsers(term: string) {
        //console.log('term en servicio: ', term);
        this._usersSearch.set(this._users().filter(user => {
            //console.log('devuelvo: ', user.name.toLowerCase().includes(term.toLowerCase()));
            return user.name.toLowerCase().includes(term.toLowerCase())
        }));
    }

    constructor() { }

    /**
     * Cambia el estado de activación de un usuario
     */
    toggleUserStatus(userId: string) {
        this._users.update(users => users.map(user =>
            user.id === userId ? { ...user, isActive: !user.isActive } : user
        ));
    }

    /**
     * Futura integración con API para obtener usuarios
     */
    fetchUsers() {
        console.log('Obteniendo usuarios desde la API...');
        // Aquí se implementaría HttpClient.get<User[]>(...)
    }
}
