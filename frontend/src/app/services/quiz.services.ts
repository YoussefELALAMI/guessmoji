export interface Question {
    answer: string,
    question: string
}

export interface QuizData {
    category: string;
    length: number;
    questions: Question[]
}