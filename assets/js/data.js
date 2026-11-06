/* =====================================================================
   ALL SITE CONTENT LIVES HERE. Edit this file to update the portfolio.
   - Profile photo:  put your photo at  assets/profile.jpg
   - Resume:         put your PDF at    assets/resume.pdf
   - Projects: leave github / demo empty ("") to hide that button.
   ===================================================================== */
window.SITE = {
  name: "Moria Deri",
  firstName: "Moria",
  role: "Computer Science Student & Tech Enthusiast",
  tagline: "B.Sc. Computer Science student at the Hebrew University of Jerusalem, building clean, efficient software, from low-level systems to AI-powered tools.",
  photo: "assets/profile.jpg",
  // Resume: Google Drive link (update the file in Drive via "Manage versions" so this link stays the same).
  resume: "https://drive.google.com/file/d/1ajpgq30HUoNPb3Ur4AmxLJpDIMualQZb/view?usp=sharing",
  badges: ["B.Sc. Computer Science @ HUJI", "Software Development", "Systems & AI"],

  socials: {
    github: "https://github.com/moriaderi",
    linkedin: "https://www.linkedin.com/in/moria-deri",
    email: "moriaderi9@gmail.com"
  },

  about: {
    paragraphs: [
      "I'm a Computer Science student at the Hebrew University of Jerusalem who enjoys taking a hard problem apart and turning it into clean, efficient code. I'm most at home close to the machine: systems programming in C and C++, and solid software engineering in Python.",
      "I care about writing code that is modular, well-tested and easy for the next person to read. My coursework in algorithms and data structures shapes how I approach every problem: understand it, choose the right structure, then build.",
      "Outside of code, I mentor first-year CS students, helping them build study strategies and confidence during their transition to university. Explaining ideas clearly to others is one of the things I enjoy most."
    ],
    highlights: [
      {icon: "brain", title: "Problem Solving", text: "Algorithms, data structures and a structured approach to hard problems."},
      {icon: "terminal", title: "Systems Programming", text: "C, C++, Linux and low-level thinking about how code really runs."},
      {icon: "users", title: "Peer Mentorship", text: "Guiding first-year CS students through academic and personal challenges."}
    ]
  },

  skills: [
    {icon: "code", title: "Languages", items: ["Python", "C", "C++", "Java"]},
    {icon: "server", title: "Systems & DevOps", items: ["Linux / WSL", "Docker", "Git / Git Worktree", "VMware", "Socket Programming"]},
    {icon: "layers", title: "Tools & Frameworks", items: ["React", "AI / Prompt Engineering", "Claude CLI tooling"]}
  ],

  projects: [
    {
      icon: "brain",
      meta: "Intro to CS final project · HUJI",
      title: "Text Analyzer",
      description: "A Python text-analysis engine built as a modular, class-based pipeline: cleans and normalizes text, counts word sequences, tracks people and their aliases across sentences, and builds a co-occurrence graph between them. Uses DFS to find connected groups of related sentences and backtracking to check for fixed-length paths between people, with efficient data structures throughout and a full unit-test suite.",
      tags: ["Python", "Graph Algorithms", "DFS & Backtracking", "Data Structures", "unittest"],
      github: "",
      demo: ""
    },
    {
      icon: "server",
      meta: "DevOps course project · Sela College",
      title: "CI/CD & Cloud-Native Pipeline",
      description: "An end-to-end automated delivery pipeline for a Flask web application: containerized with Docker, built and tested with Jenkins, and deployed to Kubernetes through a GitOps workflow with ArgoCD.",
      tags: ["Docker", "Jenkins", "Kubernetes", "ArgoCD", "Flask"],
      github: "",
      demo: ""
    }
  ],

  experience: [
    {
      icon: "graduation",
      period: "2025 – Present",
      title: "Peer Mentor",
      org: "Computer Science Department, The Hebrew University of Jerusalem",
      text: "Mentoring first-year Computer Science students: academic guidance, study strategies and personal support, through group sessions and one-on-one meetings that ease the transition to university."
    },
    {
      icon: "users",
      period: "2025",
      title: "Organizing Team, HUJI Hackathon",
      org: "The Hebrew University of Jerusalem",
      text: "Part of the team organizing a large-scale 24-hour hackathon: logistics, setup and coordination for a smooth event."
    },
    {
      icon: "shield",
      period: "2021 – 2023",
      title: "Security Investigator, Intelligence Corps",
      org: "Israel Defense Forces",
      text: "Conducted high-level security interviews and suitability assessments under pressure, and trained and mentored new team members in the classification process."
    }
  ]
};
