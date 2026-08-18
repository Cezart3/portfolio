export const site = {
  name: "Cezar Tocaciu",
  role: "Backend & machine-learning engineer",
  location: "Cluj-Napoca, Romania",
  url: "https://cezart3.vercel.app",
  email: "cezartocaciu233@gmail.com",
  thesis:
    "I build complete systems on my own, and I keep track of which parts of them I can actually trust.",
  intro: [
    "Computer science at the Technical University of Cluj-Napoca, going into my fourth year. Most of what I know came from finishing things: a rental aggregator that reads facts out of badly written Romanian ad text, a trading filter that had to survive its own validation before I would run it, a Kotlin app I restructured until it also ran in a browser.",
    "The work is mostly Python and Kotlin, backend-shaped: data pipelines, typed APIs, model training that is honest about what it does not know. I write the tests first when the answer matters and I write down which parts are still unproven when it does not.",
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

export const stack = [
  {
    group: "Languages",
    items: ["Python", "Kotlin", "Java", "TypeScript", "C++", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "FastAPI",
      "SQLAlchemy 2.0",
      "pydantic",
      "Ktor",
      "REST design",
      "web scraping",
      "SQLite",
      "PostgreSQL",
      "MySQL",
      "Room",
    ],
  },
  {
    group: "Machine learning",
    items: [
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "Optuna",
      "SHAP",
      "isotonic calibration",
      "pandas",
      "NumPy",
      "PyArrow",
    ],
  },
  {
    group: "Frontend & mobile",
    items: [
      "React 18/19",
      "Compose Multiplatform",
      "Jetpack Compose",
      "Tailwind",
      "TanStack Query",
      "Vite",
      "Kotlin/Wasm",
      "Chrome MV3",
    ],
  },
  {
    group: "Testing & tooling",
    items: [
      "pytest",
      "kotlin.test",
      "Robolectric",
      "Roborazzi",
      "MockEngine",
      "ruff",
      "ESLint",
      "Gradle",
      "Git",
    ],
  },
] as const;
