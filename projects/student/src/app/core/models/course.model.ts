export interface TopicModel {
    title: string;
    duration: number; // Recibimos minutos (ej: 45) en lugar de texto "45 min"
}

export interface SyllabusModel {
    title: string;
    description: string;
    topics: TopicModel[];
}

export interface InstructorModel {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;
}

export interface CourseModel {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    level: string;
    price: number;
    duration: number;
    startDate: Date;
    endDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    instructor: InstructorModel;
    syllabus?: SyllabusModel[]; // Opcional: En listados generales el backend podría no enviarlo
}
