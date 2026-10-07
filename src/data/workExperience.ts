export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: '0',
    company: 'EnableX',
    position: 'AI & SDE Intern',
    duration: 'May 2026 - Jul 2026',
    startDate: '2026-05',
    endDate: '2026-07',
    description: 'built llm-powered product features and guardrailed prompt systems in node.js/typescript',
    achievements: [
      'Architected a guardrailed prompt system with platform-specific master prompts fixed server-side, exposing only constrained tone/style controls to prevent prompt misuse while integrating multiple LLM APIs',
      'Built an async scheduling and analytics pipeline with BullMQ and Redis for post scheduling, plus an engagement-tracking dashboard using Auth.js and Recharts',
      'Developed and maintained backend services and RESTful APIs supporting 500+ concurrent requests; wrote unit and integration tests, increasing code coverage by 40% and reducing production bugs by 20%'
    ],
    technologies: ['Node.js', 'TypeScript', 'BullMQ', 'Redis', 'Auth.js', 'LLM APIs']
  },
  {
    id: '1',
    company: 'Witzeal Technologies',
    position: 'AI & Backend Development Intern',
    duration: 'Feb 2026 - Apr 2026',
    startDate: '2026-02',
    endDate: '2026-04',
    description: 'backend systems, automation workflows, and rag-based ai agents',
    achievements: [
      'Built backend systems and automation workflows using Node.js and TypeScript, streamlining internal processes under senior mentorship',
      'Developed AI agents using RAG pipelines and LangChain, enabling context-aware retrieval and automated task execution',
      'Adopted Hono for select backend services, cutting request-handling overhead; set up monitoring and visualization dashboards with Grafana'
    ],
    technologies: ['Node.js', 'TypeScript', 'Hono', 'LangChain', 'RAG', 'Grafana']
  },
  {
    id: '2',
    company: 'Software Incubator - SDC',
    position: 'Backend Engineer',
    duration: 'Jun 2024 - Aug 2025',
    startDate: '2024-06',
    endDate: '2025-08',
    description: 'architected cloud-native microservices with 99.9% uptime',
    achievements: [
      'Architected scalable cloud-native microservices with Node.js and Express/Hono REST frameworks, delivering 99.9% uptime',
      'Designed secure RESTful APIs with OAuth2.0 and JWT authentication, accelerating client integration by 35%',
      'Mentored a team of 4+ junior developers in backend best practices, boosting team velocity by 20%'
    ],
    technologies: ['Node.js', 'Express', 'Hono', 'OAuth2.0', 'JWT', 'PostgreSQL']
  }
];
