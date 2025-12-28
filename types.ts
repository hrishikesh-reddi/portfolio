
export interface Hackathon {
  id: number;
  title: string;
  organization: string;
  achievement: string;
  description: string;
  year: string;
}

export interface Certification {
  title: string;
  issuer: string;
  details: string[];
  link: string;
  date?: string;
}

export interface Education {
  degree: string;
  institution: string;
  score: string;
  period: string;
}

// Fixed: Added missing Message interface
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
