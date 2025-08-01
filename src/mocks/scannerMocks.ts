import { ExamResult } from "../types/examTypes";
import { ExamTemplate, Student } from "../types/newTypes";

// mocks/scannerMocks.ts
export const mockBarcodes = {
  valid: [
    "9780201379624", // ISBN válido
    "4006381333931", // EAN-13 válido
    "1234567890128", // EAN-13 válido (fictício)
    "692771981516"   // UPC-A válido
  ],
  invalid: [
    "9780201379625", // ISBN inválido (dígito verificador errado)
    "123456789012",  // EAN-13 incompleto
    "ABC123456789",  // Código inválido (contém letras)
    ""               // Código vazio
  ]
};

export const mockQRcodes = {
  valid: [
    "STUDENT:12345:JOHN DOE:MATHS101",
    "BOOK:ISBN9780201379624:LOCATION-A-12",
    "ATTENDANCE:CLASS101:2023-11-15",
    "https://edu-gestor.com/verify/abcd1234"
  ],
  invalid: [
    "INVALID:FORMAT",
    "STUDENT:INVALIDID:NAME:COURSE",
    "",
    "https://malicious-site.com/phishing"
  ]
};

export const mockStudents = [
  {
    id: '1',
    name: 'João Silva',
    registrationNumber: '20230001',
    class: '3A',
    photo: 'https://example.com/photo1.jpg'
  },
  {
    id: '2',
    name: 'Maria Souza',
    registrationNumber: '20230002',
    class: '3B',
    photo: 'https://example.com/photo2.jpg'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    registrationNumber: '20230003',
    class: '3A',
    photo: 'https://example.com/photo3.jpg'
  },
  {
    id: '4',
    name: 'Ana Costa',
    registrationNumber: '901234',
    class: '3A',
    // Aqui, sem a foto
  },
  {
    id: '5',
    name: 'Lucas Pereira',
    registrationNumber: '567890',
    class: '3B',
  },
  {
    id: '6',
    name: 'Carla Mendes',
    registrationNumber: '678901',
    class: '3C',
    photo: 'https://example.com/photos/carla.jpg'
  },
  {
    id: '7',
    name: 'Felipe Rocha',
    registrationNumber: '234567',
    class: '7A'
    // sem foto
  },
  {
    id: '8',
    name: 'Bruna Almeida',
    registrationNumber: '890123',
    class: '3A',
    photo: 'https://example.com/photos/bruna.jpg'
  },
  {
    id: '9',
    name: 'Ricardo Lima',
    registrationNumber: '456789',
    class: '3B',
    photo: 'https://example.com/photos/ricardo.jpg'
  },
  {
    id: '10',
    name: 'Juliana Martins',
    registrationNumber: '112233',
    class: '3C'
    // sem foto
  },
];

export const mockBooks = [
  {
    isbn: "9780201379624",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    available: true
  },
  {
    isbn: "9780132350884",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    available: false
  },
  {
    isbn: "9780321125217",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    available: true
  }
];

export const sampleExamTemplate: ExamTemplate = {
  id: '001',
  title: 'Prova de Matemática - 3º Ano',
  questions: 20,
  alternatives: ['A', 'B', 'C', 'D', 'E'],
  answerKey: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']
};

export const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    registrationNumber: '2023001',
    class: 'Turma A',
    photo: 'https://example.com/photos/joao.jpg'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    registrationNumber: '2023002',
    class: 'Turma B',
    photo: 'https://example.com/photos/maria.jpg'
  },
  {
    id: '3',
    name: 'Carlos Souza',
    registrationNumber: '2023003',
    photo: 'https://example.com/photos/carlos.jpg'
  },
  {
    id: '4',
    name: 'Ana Costa',
    registrationNumber: '2023004',
    class: 'Turma C',
  },
  {
    id: '5',
    name: 'Luís Pereira',
    registrationNumber: '2023005',
    class: 'Turma A',
    photo: 'https://example.com/photos/luis.jpg'
  }
];

export const initialExams: ExamResult[] = [
  {
    id: '1',
    studentName: 'João Silva',
    studentId: '2023001',
    examDate: '2024-03-15',
    subject: 'Matemática',
    answers: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
    status: 'corrected',
    score: 8.5,
    totalQuestions: 10
  },
  {
    id: '2',
    studentName: 'Maria Santos',
    studentId: '2023002',
    examDate: '2024-03-15',
    subject: 'Matemática',
    answers: ['A', 'B', 'C', 'A', 'A', 'B', 'C', 'D', 'B', 'B'],
    status: 'corrected',
    score: 7.0,
    totalQuestions: 10
  },
  {
    id: '3',
    studentName: 'Pedro Costa',
    studentId: '2023003',
    examDate: '2024-03-15',
    subject: 'Matemática',
    answers: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
    status: 'pending',
    score: null,
    totalQuestions: 10
  }
]

export const mockExamData = {
  questionCount: 20,
  examName: "Prova Modelo 2023",
  subject: "Matemática"
};