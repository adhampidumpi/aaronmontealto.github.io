// Edit your public information here. Leave unprovided contact details empty.
export const portfolio = {
  name: 'Aaron Dave Montealto',
  displayName: 'Aaron Dave',
  headline: 'Computer Science Student & Software Developer',
  heroDescription:
    'Building modern web applications and foundational software systems. Focused on clean architecture, algorithms, and practical engineering solutions in C++, Python, and React.',
  about:
    "I'm a second-year Computer Science student dedicated to building robust software and performant web applications. Rather than relying on surface-level abstractions, I focus on understanding systems thoroughly—from memory management and algorithmic efficiency in C++ to responsive frontend architecture and relational database design. I enjoy turning technical challenges into clean, tested, and reliable code.",
  github: 'https://github.com/adhampidumpi',
  email: '',
  linkedin: '',
  education: {
    degree: 'Bachelor of Science in Computer Science',
    year: '2nd Year Undergraduate',
    institution: 'College of Computer Studies',
    dates: '2023 – Present',
  },
  skillGroups: [
    { label: 'Core & Systems Programming', skills: ['C++', 'Python', 'Java'] },
    { label: 'Web & Interface Design', skills: ['React', 'JavaScript', 'Tailwind CSS'] },
    { label: 'Data & Developer Tooling', skills: ['SQL', 'Git', 'GitHub'] },
  ],
  interests: [
    {
      title: 'Full-Stack Web Development',
      description:
        'Architecting responsive, high-performance web applications with modular frontend components, clean state management, and reliable backend services.',
      icon: 'web',
    },
    {
      title: 'Applied AI & Automation',
      description:
        'Leveraging machine learning models and modern API pipelines to automate complex workflows and build intelligent developer utilities.',
      icon: 'sparkles',
    },
    {
      title: 'Systems & Algorithm Design',
      description:
        'Analyzing data structures, algorithmic complexity, and system-level performance to construct scalable software that runs efficiently.',
      icon: 'terminal',
    },
  ],
  freelanceDescription:
    'Available for software development internships, freelance web projects, and open-source collaboration. Committed to delivering clean, tested code and reliable communication.',
}

export const PROJECT_STATUSES = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

/**
 * Add only real projects. Keep planned work clearly marked as planned.
 * Optional images and URLs can be empty strings.
 * @type {Array<{
 *   title: string,
 *   description: string,
 *   techStack: string[],
 *   status: 'planned' | 'in-progress' | 'completed',
 *   image: string,
 *   githubUrl: string,
 *   demoUrl: string
 * }>}
 */
export const projects = [
  {
    title: 'Data Structures & Algorithms Suite',
    description:
      'A comprehensive implementation and benchmarking suite of core data structures (trees, graphs, heap queues) and search/sort algorithms built in C++ with memory optimization.',
    techStack: ['C++', 'Algorithms', 'Data Structures', 'Git'],
    status: 'in-progress',
    image: '',
    githubUrl: 'https://github.com/adhampidumpi',
    demoUrl: '',
  },
  {
    title: 'Interactive Developer Portfolio',
    description:
      'A high-performance personal portfolio featuring real-time 3D Three.js particle systems, interactive parallax cards, and modern responsive design.',
    techStack: ['React', 'Three.js', 'Tailwind CSS', 'Vite'],
    status: 'completed',
    image: '',
    githubUrl: 'https://github.com/adhampidumpi',
    demoUrl: '',
  },
  {
    title: 'Relational Database & Task Management',
    description:
      'A modular task pipeline with relational database schemas, structured query filtering, and automated status tracking designed for team productivity.',
    techStack: ['SQL', 'Python', 'Database Design'],
    status: 'planned',
    image: '',
    githubUrl: 'https://github.com/adhampidumpi',
    demoUrl: '',
  },
]
