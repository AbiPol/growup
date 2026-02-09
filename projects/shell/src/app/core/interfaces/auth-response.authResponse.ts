import { User } from "@shared/interfaces/user.interface";

export interface AuthResponse {
    token: string;
    user: User;
}
