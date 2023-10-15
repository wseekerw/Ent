export interface Quiz {
    id: number;
    name: string;
    questions: Question[]
}

export interface NewQuiz {
    name: string;
    questions: Question[]
}

export interface Question {
    id: number;
    question: string;
    answer: string;
}

export interface QuestionForSolving {
    question: string;
    answer: string;
    answered: boolean;
    correct: boolean;
    showAnswer: boolean;
    lastSlide: boolean;
}

export interface State {
    quizzes: Quiz[];
    questions: Question[];
}



