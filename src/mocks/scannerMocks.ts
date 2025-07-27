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
    id: "12345",
    name: "John Doe",
    course: "Computer Science",
    photo: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "67890",
    name: "Jane Smith",
    course: "Electrical Engineering",
    photo: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: "54321",
    name: "Robert Johnson",
    course: "Mathematics",
    photo: "https://randomuser.me/api/portraits/men/2.jpg"
  }
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