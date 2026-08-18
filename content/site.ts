export const site = {
  name: "Cezar Tocaciu",
  role: "Backend & machine-learning engineer",
  location: "Cluj-Napoca, Romania",
  url: "https://cezart3.vercel.app",
  email: "cezartocaciu233@gmail.com",
  thesis:
    "I build complete systems on my own, and I keep track of which parts of them I can actually trust.",
  intro: [
    "Computer science at the Technical University of Cluj-Napoca, going into my fourth year. Most of what I know came from finishing things: a rental aggregator that reads facts out of badly written Romanian ad text, a trading filter that had to survive its own validation before I would run it, a translation app I helped restructure until it also ran in a browser.",
    "The work is mostly Python, backend-shaped: data pipelines, typed APIs, model training that is honest about what it does not know. I write the tests first when the answer matters, and I write down which parts are still unproven when it does not.",
    "A lot of the typing is done by coding agents now. That changes what the job is, not whether it has to be right — I decide what gets built, set up how the agent works, then stand between what it produces and the main branch: reading the diffs, writing the tests that have to pass, and keeping a written record of what has never actually run. The habits on this page came from needing to trust code I did not type line by line.",
  ],
  links: {
    github: "https://github.com/Cezart3",
    linkedin: "https://www.linkedin.com/in/tocaciu-cezar-0865373b6/",
    instagram: "https://instagram.com/tcezar3",
    cv: "/cezar-tocaciu-cv.pdf",
  },
  education: {
    school: "Technical University of Cluj-Napoca",
    degree: "BSc Computer Science",
    period: "Oct 2023 — present",
    note: "Fourth year, starting October 2026.",
  },
  languages: [
    { name: "Romanian", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
} as const;

/**
 * Graded the same way the projects are. A list that claims everything claims
 * nothing, and the first interview question would take it apart anyway.
 */
export const stack = [
  {
    group: "First choice",
    note: "Reach for these without thinking, and can take them apart in an interview.",
    items: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "pytest",
      "pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "SQL",
      "regex",
      "web scraping",
      "Git",
    ],
  },
  {
    group: "Used on real work",
    note: "Shipped something with each of these, and would need to look things up.",
    items: [
      "Java",
      "Swing",
      "MySQL",
      "SQLite",
      "TypeScript",
      "React",
      "Tailwind",
      "C++",
      "MetaTrader 5 API",
      "CustomTkinter",
      "LightGBM",
      "Optuna",
    ],
  },
  {
    group: "Built with, still learning",
    note: "Real work in them on the translation app, next to its maintainer and with coding agents. Not fluency, and I am not going to call it that.",
    items: ["Kotlin", "Kotlin Multiplatform", "Compose Multiplatform", "Ktor"],
  },
  {
    group: "How I work",
    note: "Agents write a lot of the code. Review, tests, and being explicit about what has not been checked are what make that defensible.",
    items: [
      "Claude Code",
      "agent skills & hooks",
      "code review",
      "tests as the gate",
    ],
  },
] as const;
