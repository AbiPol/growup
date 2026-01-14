import { Role } from "../models/role.enum";

export interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    role: Role;
}
