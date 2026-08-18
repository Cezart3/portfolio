/**
 * Every project entry carries an evidence line: the kind of confidence that
 * stands behind it, and the artefact that pins it. Nothing here is a claim
 * without something to check it against.
 */

export interface Evidence {
  /** Short word for the kind of confidence. Rendered in the chip. */
  mark: string;
  /** The artefact that pins the claim. */
  detail: string;
  /** Automated tests assert this — the chip picks up the accent colour. */
  strong?: boolean;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface CaseSection {
  title: string;
  body: string[];
  list?: { term: string; text: string }[];
  /** Renders a worked example under the prose. */
  figure?: "extraction";
}

export interface Project {
  slug: string;
  name: string;
  /** One line, used in the index. Written to be read in a scan. */
  index: string;
  /** Longer summary for the case-study header. */
  summary: string;
  kind: string;
  period: string;
  evidence: Evidence;
  /** The single number worth putting in the index row. */
  metric: { value: string; label: string };
  stack: string[];
  links: ProjectLink[];
  role?: string;
  sections: CaseSection[];
  /** Shown as a standing note at the top of the case study. */
  note?: string;
}

export const projects: Project[] = [
  {
    slug: "kira",
    name: "Kira",
    index: "Rental aggregator for Romania, with the filters the listing sites don't have",
    summary:
      "Kira pulls rental listings from five Romanian property sites into one place and adds the three filters that actually decide whether a flat is liveable for a student: how it is heated, whether you can park, and how far it is on foot from your faculty.",
    kind: "Personal project · public, source-available",
    period: "2026",
    evidence: {
      mark: "Proven",
      detail: "~70 backend tests · ruff, tsc --strict and ESLint clean",
      strong: true,
    },
    metric: { value: "5", label: "source sites behind one scraper contract" },
    stack: [
      "Python 3.12",
      "FastAPI",
      "SQLAlchemy 2.0",
      "APScheduler",
      "SQLite",
      "React 18",
      "TypeScript",
      "Tailwind v4",
      "TanStack Query",
      "pytest",
    ],
    links: [
      { label: "Live demo — invented listings", href: "https://kira-imobiliare.vercel.app" },
      { label: "Repository", href: "https://github.com/Cezart3/KiraImobiliare" },
      {
        label: "Setup guide (Romanian)",
        href: "https://github.com/Cezart3/KiraImobiliare/blob/main/README.ro.md",
      },
    ],
    sections: [
      {
        title: "The problem",
        body: [
          "Looking for a rental in Cluj means keeping six tabs open — Storia, OLX, Imobiliare, Publi24, Lajumate — and re-reading the same ads on each of them. None of those sites can answer the questions that decide the actual cost of living somewhere.",
          "Whether a flat has its own gas boiler or district heating changes the winter bill by a factor. Whether the parking is included, rentable nearby, or nonexistent changes whether you can keep a car at all. And the distance that matters is not the distance to the city centre, it is the walk to your own faculty. Kira exists because those three filters do not exist anywhere else.",
        ],
      },
      {
        title: "How it runs",
        body: [
          "A polite scraping worker downloads public listing pages. A regex pipeline pulls the facts out of the text. Everything is geocoded and matched against rentable parking nearby. A FastAPI backend serves it, a React single-page app displays it.",
          "No listings ship in the repository. Each user generates their own data on first run — about ten to twelve minutes for a city, with live progress — and after that it is instant. Every card links back to the original ad on the source site.",
        ],
      },
      {
        title: "Reading facts out of badly written Romanian",
        body: [
          "Rental ads are written by people in a hurry. The heating type might be a sentence, a single word, or an abbreviation. Prices are written with a comma, a dot, or neither, so 350.000 and 350,00 have to be told apart before either becomes a number. Parking might be a garage, an assigned spot, a paid subscription, or a hopeful sentence about the neighbourhood.",
          "The extraction is pure regex rather than a model, deliberately. It is auditable — when a listing gets classified wrong I can see the rule that did it — it runs offline, and it costs nothing per listing. The classifiers cover a heating taxonomy, a parking taxonomy, price-separator disambiguation, street names and landmarks.",
        ],
        figure: "extraction",
      },
      {
        title: "Geocoding without burning the budget",
        body: [
          "Addresses in ads are approximate. The geocoder walks a ladder: exact street first, then a landmark, then a zone, then the city as a last resort, so a vague ad still lands somewhere useful instead of being dropped. The Nominatim client is budgeted and caches every answer in the database, because a public geocoder is a shared resource and a scraper that hammers one is the reason those services add limits.",
          "Once a listing has coordinates, it gets a walking-time estimate to an address you enter, a link straight into Google Maps, and a match against rentable parking spots within walking distance.",
        ],
      },
      {
        title: "The parts nobody sees",
        body: [
          "The unglamorous half is what makes it safe to run:",
        ],
        list: [
          {
            term: "Per-IP rate limiting",
            text: "on the API, so a loop in a browser tab cannot turn into a scrape of the source sites.",
          },
          {
            term: "An SSRF-safe image proxy",
            text: "— listing images come from arbitrary third-party hosts, so the proxy validates before it fetches.",
          },
          {
            term: "Data minimisation",
            text: "— phone numbers and email addresses are stripped from ad text before anything is stored.",
          },
          {
            term: "Polite scraping",
            text: "with delays, page caps and an on-disk cache, so a re-run costs the source sites nothing.",
          },
        ],
      },
      {
        title: "Why it runs on your machine and not on mine",
        body: [
          "Kira is source-available under a personal-use licence: clone it, run it, change it, tell a friend. What the licence does not allow is hosting it publicly or selling it, and that restriction is mine, written on purpose.",
          "The listings belong to the sites they came from, and their terms of service forbid aggregating and republishing them. One person running the tool for themselves is private use. A public instance serving everyone is a different thing legally, and pretending otherwise would be the kind of shortcut this project is not for.",
        ],
      },
      {
        title: "The demo, and what it is careful about",
        body: [
          "So that the interface can be looked at without installing anything, there is a demo — and everything in it is invented. A generator composes Romanian ad text from templates and runs that text through the app's own extractors and matching service, which means the demo exercises the real pipeline: the same routes, the same queries, the same heating and parking classifiers, the same parking-proximity matching. Only the ads underneath are made up, and a banner says so on every screen.",
          "Two routes are closed in demo mode, because they are the only ones that can reach a third party. Scraping returns 403, so a public instance can never pull from a listing site. The image proxy returns 404, because an image proxy on a public host is an open door and the invented listings have no photos anyway. Geocoding is answered from a bundled table of well-known places rather than from Nominatim — a public instance should not send a shared community service whatever strangers type into a search box.",
          "For real listings, the answer is still to run it locally. That is what the tool is for.",
        ],
      },
    ],
  },

  {
    slug: "unlost-in-translation",
    name: "Unlost in Translation",
    index:
      "Open-source AI translator by Radu Marias — I contribute the architecture work",
    summary:
      "An open-source project by Radu Marias: an app that translates, then checks the result against context, tone and culture before you send it. I am a contributor, working alongside Radu — the project and its direction are his, and every change of mine went through a pull request he reviewed and merged. My part has been restructuring the app into a Kotlin Multiplatform project that also runs in a browser, and building the end-to-end encrypted two-device conversation feature.",
    kind: "Open-source contribution · project by Radu Marias",
    period: "Jul — Aug 2026",
    role: "Contributor, working with the project's maintainer",
    evidence: {
      mark: "Merged",
      detail: "138 of 142 commits · 20+ pull requests reviewed and merged by the maintainer",
      strong: true,
    },
    metric: {
      value: "1",
      label: "shared module now feeding Android, Wear and the browser",
    },
    stack: [
      "Kotlin",
      "Kotlin Multiplatform",
      "Compose Multiplatform",
      "Kotlin/Wasm",
      "Ktor",
      "kotlinx.serialization",
      "Room",
      "Gemini API",
      "Cloudflare Workers",
      "WebSockets",
      "ECDH · HKDF · AES-GCM",
      "Robolectric",
      "Roborazzi",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/radumarias/unlost-in-translation-mobile",
      },
      {
        label: "My commits",
        href: "https://github.com/radumarias/unlost-in-translation-mobile/commits?author=Cezart3",
      },
      {
        label: "STATUS.md — what is proven and what is not",
        href: "https://github.com/radumarias/unlost-in-translation-mobile/blob/main/STATUS.md",
      },
    ],
    sections: [
      {
        title: "Whose project this is, and what I do on it",
        body: [
          "Unlost in Translation is Radu Marias' project. He owns it, sets the direction, and reviews and merges everything that lands. I contribute to it, working next to him rather than on my own: we agree on what an arc should do, I build it in the open across a series of pull requests, and he reviews them.",
          "That collaboration is most of what I got out of it. Working with someone senior means the first version of a design is usually not the one that ships, and the reasons why are the part worth learning. What follows is the work I did — not a claim on the project.",
        ],
      },
      {
        title: "How this was actually built",
        body: [
          "Most of the Kotlin here was written by coding agents, working from what Radu and I had agreed an arc should do. I am not going to turn that into a claim of fluency in Kotlin Multiplatform, because it is not one.",
          "What I did was decide what got built, set the agents up to build it, and then stand between their output and the branch: reading every diff, writing the tests that had to pass before anything merged, running the audit that turned up the security findings below, and keeping the document that grades which parts are proven and which have never run anywhere.",
          "That document exists because of how the code was written, not in spite of it. When you did not type something line by line, the only defensible position is to be explicit about what has been checked and what has not.",
        ],
      },
      {
        title: "Where it started",
        body: [
          "The app began as an AI Studio export: one Android module, screens and logic in the same files, network calls written by hand against Gemini. It worked, and it could not be extended. The job I took on was giving it an architecture.",
          "The work ran in phases, each one a pull request that had to leave the app working. Nothing was rewritten wholesale.",
        ],
      },
      {
        title: "Taking it apart",
        body: [
          "First the seams. Screens and components moved out into their own files, the translation service was ported to Ktor with kotlinx.serialization, the view model became a plain class with dependencies handed to it by an application container instead of reaching for Android APIs directly, and history went behind a repository interface.",
          "Then the parsers were pulled out as pure functions and pinned with fixture-backed tests. That mattered later: those parsers are the part that turns an unpredictable model response into typed data, and they are now the best-tested code in the project.",
        ],
      },
      {
        title: "One codebase, three targets",
        body: [
          "With the seams in place I created a shared Kotlin Multiplatform module and moved the domain model, network layer, platform interfaces and Room storage into it. Then Compose Multiplatform went on top, a wasmJs target was added, and a separate web module started hosting the same composables on a canvas.",
          "Two things had to be solved to get there. The serialization compiler plugin did not cooperate with Compose on wasm, so the serializers are hand-written. And the platform layer needed real web implementations: history in localStorage, voice input through the browser's SpeechRecognition, speech synthesis, an image picker. Features that only exist on a phone — Wear sync, routing audio to two different headsets — are hidden by capability gating rather than crashing.",
        ],
      },
      {
        title: "The security audit",
        body: [
          "Partway through I audited what was there and wrote the findings down. Four were real:",
        ],
        list: [
          {
            term: "The API key travelled in the URL",
            text: "and a timeout message printed the failing URL on screen. It moved into a header, and two tests now assert the key never appears in a URL or in an error message.",
          },
          {
            term: "Translation history was in the Android backup set",
            text: "— everything anyone had ever translated followed the account to a new device. Excluded from backup and transfer.",
          },
          {
            term: "The Wear service logged translation text to logcat",
            text: ", where any app with log access could read it. Removed.",
          },
          {
            term: "An empty response from Google crashed on an array index",
            text: "instead of reporting a parse error. It now fails as what it is.",
          },
        ],
      },
      {
        title: "Two phones, one conversation, end to end encrypted",
        body: [
          "The largest piece of feature work: two people, each holding their own phone, in one live translated conversation. It needed a transport, a protocol and crypto, and none of it could be trusted to a server.",
          "A WebSocket fan-out relay runs on Cloudflare Workers and only ever sees ciphertext. The wire format and the link seam live in shared code, so the same transport drives Android and the browser. Recent frames are replayed on reconnect, because a dropped connection must not silently eat someone's turn. The session key comes from an ECDH exchange through HKDF into AES-GCM, with fixed vectors pinning the key schedule, and the handshake fails closed — if it cannot verify, it does not send. Before the conversation starts, both people compare a short authentication string, so a relay that swapped keys is visible to a human.",
          "Later I made the same thing work from the browser, with the pairing QR carrying an ordinary https link so scanning it opens the app when it is installed and the web build when it is not.",
        ],
      },
      {
        title: "Sixteen languages, one catalogue",
        body: [
          "A translation app that only speaks English to its user is an odd thing. Every shared string moved into a single catalogue, including the messages the view model produces, and the interface was translated into all sixteen languages the app supports.",
          "The tests check what a human reviewer would miss: every supported language has a catalogue, locale resolution falls back correctly, placeholders survive translation, and nothing is blank.",
        ],
      },
      {
        title: "What is proven, and what I said was not",
        body: [
          "The repository carries a status document I wrote that grades every part of the codebase by how much evidence stands behind it, and it is deliberately unflattering. The network layer, the view model, Room and the image downscaler are covered by tests that run. Most of the interface is reviewed but not executed. Every remaining platform integration — camera hand-off, text to speech, the watch, most browser APIs — has never run anywhere, and the document says so.",
          "The tests that do exist earn their place. Nineteen run against a real Ktor WebSocket server. Forty-five drive the Gemini request shapes through a mock engine, down to the exact JSON body. Twenty-five cover the remote half of the view model. Seven cover Android image loading, and those seven found three real bugs — including one where the decoder returned null for every single image, which means camera and gallery translation could never have worked at all.",
        ],
      },
    ],
  },

  {
    slug: "trading-bot",
    name: "TradingBot",
    index: "Opening-range breakout on US30, filtered by a calibrated ML model",
    summary:
      "A day-trading bot for the Dow Jones CFD running live against MetaTrader 5. The trading rule is deliberately simple. The work is in the model that decides which breakouts are worth taking, and in the discipline that stops that model from fooling itself.",
    kind: "Personal project · code private, write-up public",
    period: "2025 — 2026",
    evidence: {
      mark: "Validated",
      detail: "walk-forward across 5 expanding windows · bootstrapped lift over baseline",
      strong: true,
    },
    metric: {
      value: "~3,000",
      label: "labelled trades, 67 causal features each",
    },
    stack: [
      "Python",
      "XGBoost",
      "LightGBM",
      "scikit-learn",
      "Optuna",
      "SHAP",
      "pandas",
      "NumPy",
      "PyArrow",
      "MetaTrader 5 API",
      "pydantic",
      "CustomTkinter",
      "pytest",
    ],
    links: [
      { label: "Write-up", href: "https://github.com/Cezart3/TradingBot" },
    ],
    note: "The source is private: the bot is in demo forward-testing and the strategy is the whole edge. The write-up documents the engineering. It has never traded real money.",
    sections: [
      {
        title: "The problem, stated as classification",
        body: [
          "A raw opening-range breakout on US30 is barely profitable. Backtested honestly with a realistic ECN spread it sits near break-even, around a 35% win rate at two-to-one. There is an edge in there, buried in noise.",
          "So the task is not predicting the market. It is: given everything observable at the moment a breakout fires, estimate the probability that this specific trade reaches +2R before −1R, and take only the trades whose calibrated probability clears a learned threshold. Framed that way it becomes measurable — the model is judged on calibration and expected R per trade, not on accuracy, and the decision to deploy comes from out-of-sample expectancy rather than a good-looking backtest.",
        ],
      },
      {
        title: "Features that could have been known at the time",
        body: [
          "The training set comes from replaying the strategy bar by bar across eight years of five-minute data and labelling each trade by what actually happened. Every trade is described by 67 features, all computed causally from information available at entry: the geometry of the setup, multi-timeframe context joined by an as-of merge against the last closed bar on each timeframe, and session and calendar position.",
          "Features that looked predictive but carried no real information — raw price levels, CFD tick volume — were dropped after analysis rather than kept because they improved a number.",
        ],
      },
      {
        title: "Closing the ways this silently breaks",
        body: [
          "Most machine learning applied to trading fails because the evaluation leaks, not because the model is weak. The pipeline is built around that:",
        ],
        list: [
          {
            term: "Time-ordered splits, never random",
            text: "— train, calibration and test are contiguous in time, so the model is always tested on its own future.",
          },
          {
            term: "Purged cross-validation with a gap and an embargo",
            text: "so a trade whose daily-timeframe lookback overlaps the next segment cannot leak its label across the boundary.",
          },
          {
            term: "The threshold is chosen on calibration and reported on test",
            text: ". Picking the operating point on the same data you report is the most common way a backtest gets inflated.",
          },
          {
            term: "A feature-parity test as the deploy gate",
            text: "— a golden-vector test asserts the live feature builder produces the same vectors as the training pipeline, to float tolerance. It caught a real look-ahead bug where the two disagreed.",
          },
        ],
      },
      {
        title: "Making the probabilities mean something",
        body: [
          "The filter is an ensemble of gradient-boosted trees, XGBoost and LightGBM, each tuned by Optuna over 200 trials optimising the Brier score rather than accuracy — because the strategy depends on the probabilities being honest, not merely well-ranked. Raw scores then pass through isotonic regression fitted on the held-out calibration set, so a 0.6 really does mean roughly a 60% win rate, and that claim is checked with reliability diagrams and log loss.",
          "SHAP values rank what the model is leaning on, and it is retrained on the top 70% of features to confirm the edge is not resting on a few fragile inputs. Risk of ruin is modelled separately: bootstrap intervals on win rate and average R, and a Monte-Carlo trade shuffle to estimate the drawdown distribution and the chance of breaching a prop-firm limit at a given risk per trade.",
        ],
      },
      {
        title: "The test that killed the better-looking model",
        body: [
          "A filter that merely takes fewer trades can look good by luck. So the pipeline compares the average R of ML-selected trades against taking every rule-filtered signal, and bootstraps the difference over 5,000 resamples. The model ships only if the lower bound of that interval stays above zero.",
          "That test rejected a variant I wanted to keep. A one-to-one configuration produced a much prettier 63% win rate — but its confidence interval for expectancy included zero and one walk-forward fold went negative. The two-to-one configuration, with a worse-looking win rate, held up in every fold. The prettier number lost.",
        ],
      },
      {
        title: "Live, and the brakes on it",
        body: [
          "At the New York open the bot builds the fifteen-minute range, takes the first five-minute close beyond it, filters weak setups by rule, then scores the survivor and trades only above threshold. Stop at the volume-profile point of control, target at 2R, one re-entry allowed after a stop, flat by the end of the session.",
          "Risk is fixed at 1% per trade, halved after two consecutive losses, behind a daily-loss breaker and a maximum-drawdown breaker. Breaker state is persisted, so a restart in the middle of a bad session does not hand the bot a clean slate it has not earned.",
        ],
      },
    ],
  },

  {
    slug: "shower-configurator",
    name: "ShowerConfig",
    index: "Desktop configurator that turns a shower-cabin sale into a priced PDF quote",
    summary:
      "A Java desktop application built for a shower-cabin manufacturer. It walks a salesperson through the configuration, computes the bill of materials and the price, and exports the quote as a PDF. It replaced a spreadsheet and is in daily use.",
    kind: "Client work · code private, write-up public",
    period: "2025",
    evidence: {
      mark: "In use",
      detail: "running daily at the manufacturer it was built for",
    },
    metric: { value: "7", label: "cabin models, each with its own hardware recipe" },
    stack: ["Java", "Swing", "MySQL", "PDF export", "BNR exchange-rate API"],
    links: [
      { label: "Write-up", href: "https://github.com/Cezart3/ShowerConfig" },
    ],
    note: "The source is private because it encodes the client's product catalogue, pricing rules and hardware data, which belong to them.",
    sections: [
      {
        title: "The job",
        body: [
          "Quoting a custom shower cabin means knowing which hinges that model takes, how many handles, which profiles and at what lengths, then measuring the glass, applying the surcharges, converting from euro at today's rate and writing it all up. Done by hand it is slow and it is wrong often enough to matter.",
          "The application follows the sale as it actually happens: a step navigator drives the flow and the path adapts to the product — a hinged cabin branches into sub-types, a fixed panel goes straight to dimensions.",
        ],
      },
      {
        title: "The cabin type is the pivot",
        body: [
          "This is the core of the tool. Each model the shop sells has a known recipe of hardware, and every model is described by an object that groups its hardware by category and stores the profile lengths. Choosing the model preselects every piece with the right quantity, and the salesperson only adjusts the exceptions.",
          "The same description is reused downstream, so the choice made in step one still governs how the glass is cut and how the price is assembled in step five. Nobody re-enters anything.",
        ],
      },
      {
        title: "Glass, price and the exchange rate",
        body: [
          "Dimensions produce the surface area and perimeter of every glass panel individually, because that is what the surcharges attach to: grinding, drilling, extra cut-outs, shape and template work, tempering.",
          "The price calculator sums glass, hardware and profiles, then applies the current RON rate pulled live from the National Bank of Romania's API — the quote is in the currency the customer pays in, at today's rate, not at whatever was hard-coded last year. The result exports as a PDF offer.",
        ],
      },
      {
        title: "Keeping it current without me",
        body: [
          "A login-gated admin panel lets the business edit the catalogue itself: add and remove products, change elements, adjust prices and settings. Product ranges change and prices change more often, and a tool that needs a developer for either would have been abandoned within a year.",
        ],
      },
    ],
  },

  {
    slug: "rankup",
    name: "RankUp",
    index: "Chrome extension that parses CS2 demos in the browser to map opponents' positions",
    summary:
      "A Manifest V3 extension that reads FACEIT match demos entirely in your browser and plots where each enemy player tends to play as anchor dots on the map radar. It runs with no backend at all.",
    kind: "Personal project · public",
    period: "2026",
    evidence: {
      mark: "Shipped",
      detail: "Chrome, Edge, Brave and Opera · no backend, no telemetry",
    },
    metric: { value: "0", label: "servers — every demo is parsed client-side" },
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Chrome MV3",
      "WebAssembly",
      "Web Workers",
      "IndexedDB",
    ],
    links: [{ label: "Repository", href: "https://github.com/Cezart3/RankUp" }],
    sections: [
      {
        title: "What it shows",
        body: [
          "Enter a FACEIT match lobby and the extension detects the voted map, reads the five enemy players, and plots each of their most-used positions on the radar. Not trajectories — anchors: the spots a player returns to across the most rounds, which is what you can actually prepare against.",
        ],
      },
      {
        title: "The pipeline, all of it client-side",
        body: [
          "For each enemy, recent matches on that map are fetched, the demo download URL is signed, the file is downloaded, Zstandard-decompressed, and parsed with a WebAssembly build of a Rust demo parser. A pool of web workers processes demos in parallel, so a full five-player lobby finishes in a couple of minutes.",
          "Signing the demo URL was the awkward part: the endpoint is Cloudflare-protected, so the request has to go through a page on the site's own origin rather than from the extension directly.",
        ],
      },
      {
        title: "Turning positions into anchors",
        body: [
          "Positions are sampled ten to twenty seconds after each round starts, which skips the walk out of spawn without reaching the part of the round where everyone is reacting to contact. Those samples are clustered, and the top five spots per side are drawn, coloured by roster order.",
        ],
      },
      {
        title: "No backend, and what that buys",
        body: [
          "There is no server, so there is nothing to pay for and nothing to breach. No account, no analytics, no telemetry, and the dashboard makes zero third-party requests — the only origins it touches are the match API and the demo host.",
          "The one sensitive thing it handles is your session cookie, which the demo-signing endpoint requires. It is held in memory for the duration of a scan, sent to one origin, and never stored or logged. Parsed results are cached locally for two weeks; the demo files themselves are never kept.",
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
