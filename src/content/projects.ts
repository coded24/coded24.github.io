export type Project = {
  title: string;
  category: string;
  context: string;
  summary: string;
  role: string;
  result: string;
  stack: string[];
  details: string[];
  repo?: string;
  live?: string;
};

export const featuredProjects: Project[] = [
  {
    title: 'Automated Financial Data Pipeline',
    category: 'Data engineering · Automation',
    context: 'Daily electricity market price collection, hourly validation, storage, and report generation.',
    summary:
      'A daily pipeline that collects electricity market prices, validates hourly records, stores the data, and produces a formatted report.',
    role: 'Backend development, automation, and Linux deployment',
    result: 'A systemd-timed workflow validates 24 hourly records, stores them in PostgreSQL, and generates a formatted Excel report.',
    stack: ['Python', 'Playwright', 'PostgreSQL', 'SQLAlchemy', 'openpyxl', 'systemd'],
    details: [
      'Validates 24 hourly records before storing them in PostgreSQL.',
      'Generates a formatted Excel report after each run.',
      'Uses systemd timers to run unattended and recover after reboots; remote access is secured through WireGuard.',
    ],
  },
  {
    title: 'Raspberry Pi 5 Home Server',
    category: 'Linux · Self-hosted systems',
    context: 'A Raspberry Pi 5 configured to run local AI, messaging automation, remote access, and camera streaming.',
    summary:
      'A compact home server hosting local language models, messaging automation, secure remote access, and live camera streaming.',
    role: 'Infrastructure setup and application integration',
    result: 'Local Qwen models, a scheduled AI messaging bot, Tailscale access, and WebRTC camera streaming run from the home server.',
    stack: ['Raspberry Pi 5', 'Docker', 'Ollama', 'Open WebUI', 'MediaMTX', 'Tailscale'],
    details: [
      'Hosts Qwen 2.5 7B and 3B locally through Ollama and Open WebUI.',
      'Runs a Docker-based WhatsApp bot with AI auto-reply and scheduled messaging.',
      'Provides remote access with Tailscale and live WebRTC camera streaming with MediaMTX.',
    ],
  },
  {
    title: 'School Management System',
    category: 'Full-stack · Education',
    context: 'A school operations application covering students, teachers, classes, attendance, and grades.',
    summary:
      'A school operations application for managing students, teachers, classes, attendance, and grades.',
    role: 'Full-stack application development',
    result: 'The application includes authentication, role-based access, and a typed tRPC API layer.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'tRPC', 'MySQL', 'Tailwind CSS'],
    details: [
      'Implements authentication and role-based access.',
      'Uses tRPC for a typed API layer between the frontend and backend.',
    ],
  },
];

export const additionalProjects: Project[] = [
  {
    title: 'Automated Timetable Generation System',
    category: 'Web application · System design',
    context: 'A generic timetable generator designed for distinct school user roles.',
    summary:
      'A generic school timetable generator designed around separate administrative and student roles.',
    role: 'System design and implementation',
    result: 'A seeded superadmin establishes the initial role hierarchy instead of relying on open signup.',
    stack: ['Web application', 'Role-based access'],
    details: [
      'Defines roles for superadmins, school admins, students, and users.',
      'Uses a seeded superadmin bootstrap to establish the initial admin hierarchy instead of open signup.',
      'Design decisions were presented and defended as part of a project defense.',
    ],
  },
];

export type RecentProject = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  published: boolean;
};

export const recentProjects: RecentProject[] = [
  {
    title: 'Wi-Fi Hotspot Manager',
    date: '',
    description: '',
    tags: [],
    repo: '',
    live: '',
    image: '',
    imageAlt: '',
    published: false,
  },
];