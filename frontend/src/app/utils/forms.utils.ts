export class FormUtils {
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static passPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
    static fullNamePattern = '^[A-Za-z][A-Za-z0-9-]{2,}$'
}
