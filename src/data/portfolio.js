// Edit your public information here. Leave unprovided contact details empty.
export const portfolio = {
  name: 'Aaron Dave Montealto',
  displayName: 'Aaron Dave',
  headline: 'Computer Science Student | Aspiring Software Developer',
  heroDescription:
    'I am exploring web development, artificial intelligence, and mobile development while building practical software projects.',
  about:
    "I'm Aaron Dave, a second-year Computer Science student passionate about solving problems through technology. My interests include web development, artificial intelligence, and mobile applications. I'm focused on strengthening my programming skills, building meaningful projects, and preparing to turn those skills into practical solutions for future clients.",
  github: 'https://github.com/adhampidumpi',
  email: '',
  linkedin: '',
  education: {
    degree: 'Bachelor of Science in Computer Science',
    year: '2nd Year',
    institution: '[Institution name]',
    dates: '[Attendance dates]',
  },
  skillGroups: [
    { label: 'Programming languages', skills: ['Python', 'C++', 'Java'] },
    { label: 'Database', skills: ['SQL'] },
    { label: 'Development tools', skills: ['Git', 'GitHub'] },
  ],
  interests: [
    {
      title: 'Web Development',
      description:
        'Learning to design and build responsive, useful websites and web applications.',
      icon: 'web',
    },
    {
      title: 'Artificial Intelligence',
      description:
        'Exploring AI concepts and how intelligent tools can support real-world solutions.',
      icon: 'sparkles',
    },
    {
      title: 'Mobile Development',
      description:
        'Learning how mobile applications can solve everyday problems.',
      icon: 'mobile',
    },
  ],
  freelanceDescription:
    "I'm developing my skills and portfolio with the goal of taking on meaningful freelance software projects.",
}

export const PROJECT_STATUSES = {
  planned: 'Planned',
  'in-progress': 'In progress',
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
export const projects = []
