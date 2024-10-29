export type Article = {
    title: string;
    description: string;
    date: string;
    image: string | null;
    schoolName: string;
  };
  
  export type notifications = {
    name: string;
    surname: string;
    email: string;
    phone: number;
    message: string;
  };
  
  export type Grade = {
    gradeId: number;
    grade: string;
  };
  
  export type Subjects = {
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
  
  export type teachers = {
    id: number;
    fullName: string;
    surname: string;
    idNumber: string;
    address: string;
    emailAddress: string;
    phoneNumber: string;
    gradeId: number[]; 
    subjects: number[]; 
    password: string;
  };
  