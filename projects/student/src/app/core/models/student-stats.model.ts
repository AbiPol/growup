export interface StudentStats {
    activeCoursesCount: number;
    completedCoursesCount: number;
    certificatesEarned: number;
    totalHoursLearning: number;
    averageScore: number; // 0-100
    learningStreakDays: number; // Gamificación
}
