export type Article = {
  title: string;
  description: string;
  date: string;
  image?: string | null; // Optional property
  schoolName: string;
};

export type Notification = { // Changed to PascalCase
  name: string;
  surname: string;
  email: string;
  phone: string; // Changed to string to accommodate formatting
  message: string;
};

export type Grade = {
  gradeId: number;
  grade: string;
};

export type Subject = { // Changed to singular and PascalCase
  subjectId: number;
  subject: string;
};

export type Learner = {
  id: string;
  fullName: string;
  gradeId: string;
  marks: Array<{
    subjectId: string;
    markObtained: number;
    totalMark: number;
  }>;
};

export type Teacher = { // Changed to singular and PascalCase
  id: number;
  fullName: string;
  surname: string;
  idNumber: string;
  address: string;
  emailAddress: string;
  phoneNumber: string; // Changed to string
  gradeId: number[];
  subjects: number[];
  password: string;
};
