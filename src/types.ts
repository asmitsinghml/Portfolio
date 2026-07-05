export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  challenges: string;
  results: string;
  githubUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number; // percentage 0-100
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'certification';
  title: string;
  organization: string;
  date: string;
  details: string[];
  grade?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
  iconName: string;
}
