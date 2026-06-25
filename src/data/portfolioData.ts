export const PORTFOLIO_DATA = {
  hero: {
    name: "Muhammed Shanif",
    subtitle: "I build intelligent systems, scalable applications, and AI-powered digital experiences.",
    roles: [
      "Full Stack Developer",
      "AI Developer",
      "Startup Builder",
      "Problem Solver",
    ],
    badge: "Building AI & Full Stack Projects",
  },
  about: {
    description: "I am Muhammed Shanif, a Computer Science Engineering student passionate about building real-world technology products. My focus is on creating solutions that combine software engineering, artificial intelligence, and practical problem solving. I have built products ranging from AI-powered financial platforms to intelligent automation systems.",
    interests: ["Artificial Intelligence", "Machine Learning", "Web Development", "Trading Technology", "Automation", "Software Engineering"],
    stats: [
      { label: "Projects Built", value: "5+" },
      { label: "Technologies Used", value: "20+" },
      { label: "Development Hours", value: "1000+" },
      { label: "Learning", value: "Continuous" },
    ],
    timeline: [
      {
        year: "2021",
        phase: "Origins",
        title: "Started Exploring Software Development",
        description: "Began my journey into programming and technology by learning how software works — understanding the fundamentals of computer systems, programming logic, and problem solving.",
        tags: ["Programming Basics", "Logical Thinking", "Software Fundamentals"],
        highlight: false
      },
      {
        year: "2022 – 2023",
        phase: "Foundation",
        title: "Building Foundations Through Projects",
        description: "Converted programming knowledge into practical applications by developing small-scale software projects and experimenting with different technologies.",
        tags: ["Python", "Problem Solving", "Application Logic", "Project Development"],
        projects: ["Tic Tac Toe Game", "Word Guessing Game", "Python Applications", "Logic Based Programs"],
        highlight: false
      },
      {
        year: "2024",
        phase: "Engineering",
        title: "Started Computer Science Engineering Journey",
        description: "Officially enrolled in B.Tech Computer Science Engineering at Lovely Professional University (LPU), Punjab — one of India's leading universities. Joined through academic merit scholarship and began studying CS at a deeper engineering level.",
        tags: ["Merit Scholarship", "Software Engineering", "AI", "Data Structures", "Development"],
        badge: "Lovely Professional University · B.Tech CSE",
        highlight: false
      },
      {
        year: "2024 – 2025",
        phase: "Product Building",
        title: "Building Practical Digital Solutions",
        description: "Designed and developed a College Information Platform to improve the student onboarding experience — bridging the information gap between new students and the institution.",
        tags: ["Frontend Dev", "UI/UX Design", "Web Applications", "Problem Solving"],
        projects: ["College Information System", "Academic Details Portal", "Student Guidance Platform"],
        highlight: false
      },
      {
        year: "2025 – Present",
        phase: "Startup Innovation",
        title: "Building AI Powered Products & Startup Solutions",
        description: "Entered the most intensive phase of my engineering journey — building real AI-powered products with startup ambitions. From intelligent attendance systems to financial intelligence platforms.",
        tags: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Full Stack", "React", "Node.js", "MongoDB"],
        products: [
          {
            name: "GeoFace",
            status: "Completed Startup Product · Awaiting College Funding",
            description: "AI-powered attendance and identity verification platform combining computer vision, face recognition, and geolocation intelligence to replace traditional attendance systems.",
            features: ["AI Face Recognition", "Computer Vision Verification", "Geolocation Auth", "Anti-Proxy Protection", "Real-time Processing"]
          },
          {
            name: "Stocky",
            status: "Advanced AI Financial Technology Platform",
            description: "A complete market intelligence and decision-making ecosystem — not just a dashboard. Analyzes 300+ market parameters using AI to assist trading decisions.",
            features: ["300+ Market Parameters", "Technical Analysis", "Options Intelligence", "AI Decision Support", "Portfolio Monitoring"],
            liveLink: "https://stocky-shanuzz334s-projects.vercel.app/login"
          }
        ],
        highlight: true
      }
    ]
  },
  experience: [
    {
      title: "GeoFace",
      role: "Founder & Developer",
      description: "Built an AI attendance startup product from idea to complete implementation. Currently working towards institutional support and funding.",
    },
    {
      title: "Stocky",
      role: "Creator & Full Stack Developer",
      description: "Designed and developed a complete financial analytics platform.",
    }
  ],
  projects: [
    {
      id: "stocky",
      title: "Stocky",
      status: "Production Level Project",
      projectType: "AI Powered Stock Market Intelligence Platform",
      description: "Stocky is a full-stack financial technology platform built to help traders analyze markets using data, automation, and intelligent insights. A complete trading intelligence ecosystem.",
      features: [
        "Market Dashboard",
        "NIFTY Analysis",
        "Advanced Technical Analysis",
        "200+ Technical Indicator System",
        "Fundamental Analysis Engine",
        "Options Market Analysis",
        "Market Events Tracking",
        "Foreign Market Monitoring",
        "Trade Journal",
        "Wallet / P&L Tracking",
        "User Authentication",
        "Database Integration",
        "API Based Architecture"
      ],
      technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "MongoDB Atlas", "REST APIs", "Trading APIs", "Authentication", "Cloud Deployment"],
      isFeatured: true,
      liveLink: "https://stocky-shanuzz334s-projects.vercel.app/login",
      githubLink: "https://github.com/ShanuZz334/Stocky",
      images: [
        "/projects/stocky/Screenshot 2026-06-22 173432.png",
        "/projects/stocky/Screenshot 2026-06-22 173459.png",
        "/projects/stocky/Screenshot 2026-06-22 173517.png",
        "/projects/stocky/Screenshot 2026-06-22 173535.png",
        "/projects/stocky/Screenshot 2026-06-22 173550.png"
      ],
      showcase: [
        {
          image: "/projects/stocky/Screenshot 2026-06-22 173432.png",
          title: "Authentication System",
          description: "Secure user authentication with modern UI and protected access control."
        },
        {
          image: "/projects/stocky/Screenshot 2026-06-22 173517.png",
          title: "Market Intelligence Dashboard",
          description: "Central command center displaying AI generated market insights."
        },
        {
          image: "/projects/stocky/Screenshot 2026-06-22 173550.png",
          title: "Technical Analysis Engine",
          description: "Analyzing hundreds of indicators to understand market conditions."
        },
        {
          image: "/projects/stocky/Screenshot 2026-06-22 173617.png",
          title: "Options Intelligence",
          description: "Real-time tracking of options chains, Greeks, and implied volatility."
        },
        {
          image: "/projects/stocky/Screenshot 2026-06-22 173654.png",
          title: "Portfolio Monitoring",
          description: "Live tracking of P&L, holdings, and asset allocation strategies."
        }
      ],
      architectureFlow: [
        "Data Collection",
        "300+ Market Analysis Engine",
        "AI Model Processing",
        "Market Decision Intelligence"
      ],
      architecture: [
        "React Frontend",
        "Express / Node.js API",
        "MongoDB Atlas",
        "AI Analysis Layer"
      ],
      metrics: [
        { value: "300+", label: "Market Parameters" },
        { value: "200+", label: "Technical Indicators" },
        { value: "AI", label: "Decision Engine" }
      ],
      badgeColor: "bg-green-500",
    },
    {
      id: "geoface",
      title: "GeoFace",
      status: "Startup Project",
      projectType: "AI Smart Attendance Platform",
      description: "GeoFace is an AI-powered smart attendance and verification platform designed to modernize traditional attendance systems.",
      features: [
        "Face Recognition Attendance",
        "AI Based Identity Verification",
        "Geolocation Validation",
        "Anti Proxy Attendance System",
        "Smart User Management",
        "Secure Attendance Records",
        "Real-time Verification"
      ],
      technologies: ["Python", "Artificial Intelligence", "Machine Learning", "Computer Vision", "Face Recognition Models", "Web Technologies"],
      isFeatured: false,
      liveLink: "https://github.com/ShanuZz334/GeoFensing/releases/download/v1.0.0/GeoFace.apk",
      githubLink: "https://github.com/ShanuZz334/GeoFensing",
      images: [
        "/projects/geoface/mobile (1).jpeg",
        "/projects/geoface/mobile (2).jpeg",
        "/projects/geoface/Admin (1).png"
      ],
      showcase: [
        {
          image: "/projects/geoface/mobile (1).jpeg",
          title: "Smart User Verification",
          description: "Initiating the AI-powered identity check through the mobile application."
        },
        {
          image: "/projects/geoface/mobile (6).jpeg",
          title: "AI Face Recognition",
          description: "Real-time computer vision analysis validating the user's identity."
        },
        {
          image: "/projects/geoface/mobile (7).jpeg",
          title: "Geolocation Intelligence",
          description: "Ensuring the user is within the required physical boundaries."
        },
        {
          image: "/projects/geoface/Admin (1).png",
          title: "Admin Command Center",
          description: "Institution dashboard to monitor live attendance and system health."
        },
        {
          image: "/projects/geoface/Admin (5).png",
          title: "Secure Analytics",
          description: "Reviewing detailed reports and anti-proxy protection metrics."
        }
      ],
      architectureFlow: [
        "User Verification",
        "AI Face Recognition",
        "Location Validation",
        "Secure Attendance Approval"
      ],
      architecture: [
        "Mobile App UI",
        "Python Backend API",
        "Face Recognition Models",
        "Database Engine"
      ],
      metrics: [
        { value: "AI", label: "Verification" },
        { value: "Real-time", label: "Processing" },
        { value: "Secure", label: "Authentication" }
      ],
      badgeColor: "bg-electric-blue",
      additionalInfo: {
        stage: "Product Development: Completed",
        funding: "Startup Stage: Funding/support discussion through college"
      }
    },
    {
      id: "sign-language",
      title: "Sign Language AI Translator",
      status: "AI Research Project",
      projectType: "Accessibility Solution",
      description: "AI accessibility solution helping people communicate using sign language recognition.",
      features: ["Hand Gesture Detection", "Sign Recognition", "Letter Conversion", "Word Formation", "Text To Speech Output"],
      technologies: ["Machine Learning", "Computer Vision", "AI Models", "Python"],
      isFeatured: false,
      liveLink: "#",
      githubLink: "https://github.com/ADD_GITHUB_LINK",
      badgeColor: "bg-purple-500",
    }
  ],
  skills: {
    frontend: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Framer Motion", "Vite"],
    backend: ["Node.js", "Express.js", "MongoDB", "REST API Development"],
    programming: ["Python", "Java", "JavaScript"],
    ai: ["Machine Learning", "Computer Vision", "AI Model Integration", "Local AI Models"],
    tools: ["Git", "GitHub", "VS Code", "Vercel", "Render", "MongoDB Atlas"]
  },
  education: {
    university: "Lovely Professional University (LPU)",
    degree: "Bachelor of Technology",
    major: "Computer Science Engineering",
    focus: ["Programming", "Software Development", "Artificial Intelligence", "Problem Solving"]
  },
  contact: {
    email: "shanifshaz546@gmail.com",
    github: "https://github.com/ShanuZz334/",
    linkedin: "https://www.linkedin.com/in/muhammed-shanif-1a8657338/",
    resume: "/resume.pdf"
  }
};
