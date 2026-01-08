import { createSignal, createMemo, onMount, For } from "solid-js";
import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent } from "solid-js/web";
import { u as useImageViewModal } from "./router-lSxH-c65.mjs";
const projects$1 = [
  {
    id: 11,
    name: "Game Collection",
    description: [
      "Een website om mijn gamecollectie te tonen aan vrienden en om multiplayer sessies te plannen.\n\n",
      "Gebruikers kunnen filters toepassen om te zien welke games speelbaar zijn met de op dat moment beschikbare middelen."
    ],
    slug: "game-collection",
    url: "https://github.com/jefvanzanten/game-collection",
    languages: ["TypeScript", "CSS"],
    libraries: ["React"],
    images: [""],
    coverUrl: "/covers/game-collection.png",
    thumbUrl: "/thumbs/game-collection.png",
    category: "Frontend",
    lastUpdated: "2025-09-23",
    highlighted: true
  },
  {
    id: 10,
    name: "Task Manager",
    description: [
      "Een taak- en projectbeheerder, vergelijkbaar met Notion/TickTick. ",
      "Projecten en taken zijn gebruikersspecifiek en worden ingeladen op basis van het ingelogde profiel.\n\n",
      "Gebouwd met Next.js en TypeScript; alle database-operaties zijn server-side en de data wordt lokaal opgeslagen."
    ],
    slug: "task-manager",
    url: "https://github.com/jefvanzanten/task-manager-nextjs",
    languages: ["TypeScript"],
    libraries: ["Nextjs", "TailwindCSS", "Drizzle", "Better-Auth"],
    images: [""],
    coverUrl: "/covers/task-manager-cover.png",
    thumbUrl: "/thumbs/task-manager-thumb.png",
    category: "Fullstack",
    lastUpdated: "2025-08-22",
    highlighted: true
  },
  {
    id: 9,
    name: "Make24",
    description: [
      "Een wiskunde spel waarbij de speler de som van 24 moet maken door alle 4 getallen met operatoren te gebruiken."
    ],
    slug: "make24",
    url: "https://github.com/jefvanzanten/make24",
    languages: ["TypeScript", "CSS"],
    libraries: ["React"],
    images: [""],
    coverUrl: "/covers/make24_cover.png",
    thumbUrl: "/thumbs/make24_thumb.png",
    category: "Frontend",
    lastUpdated: "2025-07-24",
    highlighted: false
  },
  {
    id: 8,
    name: "Portfolio",
    description: [
      "Mijn persoonlijke, statische, client-side gerenderde website. ",
      "Het toont een overzicht van mijn openbare GitHub-projecten met korte toelichtingen en links. ",
      "Hoofddoel is het delen van projecten gefilterd op relevante programmeertalen/tech stack."
    ],
    slug: "portfolio",
    url: "https://github.com/jefvanzanten/portfolio/",
    languages: ["TypeScript", "CSS"],
    libraries: ["React", "React-Router"],
    images: [
      "/screenshots/portfolio/mobile landingpage.png",
      "/screenshots/portfolio/mobile projectpage.png",
      "/screenshots/portfolio/desktop landingpage.png",
      "/screenshots/portfolio/desktop projectpage.png"
    ],
    coverUrl: "/covers/portfolio_cover.png",
    thumbUrl: "/thumbs/portfolio_thumb.png",
    category: "Frontend",
    lastUpdated: "2025-06-13",
    highlighted: true
  },
  {
    id: 6,
    name: "Todo server (REST API)",
    description: [
      "Dit project is mijn eerste zelfgemaakte server en draait nu live sinds mid mei. ",
      "Het is een REST API met een beveiligde POST endpoint",
      "Hierdoor is het maken van todo's alleen mogelijk met het juiste account.",
      "\n\n",
      "De REST API wordt gebruikt voor de mobile app en de web client. "
    ],
    slug: "todo-backend",
    url: "https://github.com/jefvanzanten/todobackend",
    languages: ["TypeScript"],
    libraries: ["Express", "Drizzle", "Better-Auth"],
    images: [""],
    coverUrl: "/covers/express_custom_cover.png",
    thumbUrl: "/thumbs/express_custom_thumb.png",
    category: "Backend",
    lastUpdated: "2025-05-26",
    highlighted: false
  },
  {
    id: 5,
    name: "Todo client (mobile)",
    description: [
      "De mobiele app die de Todo REST API gebruikt. ",
      "Hiermee kunnen gebruikers todo's aanmaken, bewerken (titel/status aanpassen) en de lijst visueel scheiden op basis van voltooide status."
    ],
    slug: "todo-mobile",
    url: "https://github.com/jefvanzanten/TodoRN",
    languages: ["TypeScript"],
    libraries: ["React-Native", "Better-Auth", "TanStackQuery"],
    images: [""],
    coverUrl: "/covers/todo_client_cover.png",
    thumbUrl: "/thumbs/todo_client_thumb.png",
    category: "Mobile",
    lastUpdated: "2025-06-10",
    highlighted: false
  },
  {
    id: 4,
    name: "Reeksenspel",
    description: [
      "Dit is een project waarbij ik heb geprobeerd een spel te maken met React, TypeScript en Tailwind CSS.",
      "\n\n",
      "De reeksenspellen zijn bedoeld om het werkgeheugen te trainen door de reeksen te onthouden en de juiste volgorde in te vullen. "
    ],
    slug: "reeksenspel",
    url: "https://github.com/jefvanzanten/reeksenspel/",
    languages: ["TypeScript"],
    libraries: ["React", "TailwindCSS"],
    images: [""],
    coverUrl: "/covers/reeksenspel_cover.png",
    thumbUrl: "/thumbs/reeksenspel_thumb.png",
    category: "Frontend",
    lastUpdated: "2025-04-22",
    highlighted: false
  },
  {
    id: 3,
    name: "Schoolproject: OV app (backend)",
    description: [
      "De backend REST API voor de OV-applicatie uit de tweede projectfase. ",
      "Dit was mijn eerste kennismaking met het bouwen van een REST API (bevat geen POST functionaliteit)."
    ],
    slug: "ov-app-backend",
    url: "https://github.com/jefvanzanten/ADSD-Fase2-OV-app/tree/main/backend",
    languages: ["TypeScript"],
    libraries: ["Express", "Jest"],
    images: [""],
    coverUrl: "/covers/hu_cover.png",
    thumbUrl: "/thumbs/hu_thumb.png",
    category: "Backend",
    lastUpdated: "2025-03-13",
    highlighted: false
  },
  {
    id: 2,
    name: "Schoolproject: OV app (frontend)",
    description: [
      "Dit is de frontend van de OV applicatie van het project van de 2e fase. ",
      "Deze frontend is geoptimaliseerd voor blinde mensen en is volledig toegankelijk. "
    ],
    slug: "ov-app-frontend",
    url: "https://github.com/jefvanzanten/ADSD-Fase2-OV-app/tree/main/frontend",
    languages: ["TypeScript", "CSS"],
    libraries: ["React"],
    images: [""],
    coverUrl: "/covers/hu_cover.png",
    thumbUrl: "/thumbs/hu_thumb.png",
    category: "Frontend",
    lastUpdated: "2025-03-13",
    highlighted: false
  },
  {
    id: 1,
    name: "SupplementTracker",
    description: [
      "Dit is een van de eerste native Android apps die ik heb gemaakt. ",
      "Een basis app waarmee je items in een lokale database kan opslaan en kan terugkijken per dag. "
    ],
    slug: "supplement-tracker",
    url: "https://github.com/jefvanzanten/Supplement-Tracker-Android-",
    languages: ["Kotlin"],
    libraries: ["JetpackCompose", "RoomDB"],
    images: [""],
    coverUrl: "/covers/supplement_tracker_cover.png",
    thumbUrl: "/thumbs/supplement_tracker_thumb.png",
    category: "Mobile",
    lastUpdated: "2024-11-02",
    highlighted: false
  },
  {
    id: 0,
    name: "Schoolproject: Picit",
    description: [
      "Dit is het eerste schoolproject waarbij we in teamverband werkten. ",
      "Gemaakt met Java en JavaFX.",
      "\n\n",
      "Met deze applicatie kan de gebruiker fruit in een winkelwagentje plaatsen en de bestelling afronden."
    ],
    slug: "picit-app-frontend",
    url: "https://github.com/jefvanzanten/ADSD-Fase1-Picit-app",
    languages: ["Java"],
    libraries: ["JavaFX"],
    images: [""],
    coverUrl: "/covers/hu_cover.png",
    thumbUrl: "/thumbs/hu_thumb.png",
    category: "Desktop",
    lastUpdated: "2024-06-01",
    highlighted: false
  },
  {
    id: 12,
    name: "Schoolproject: Fitness app",
    description: [
      "Dit is het eerste schoolproject. Een console applicatie voor de gebruikers van een fitnessschool. ",
      "Ik was tijdens dit project aan het inlezen over design patterns en had besloten voor dit project voor de state pattern te kiezen.",
      "\n\n",
      "Met deze applicatie was het de bedoeling dat de gebruiker zijn fitnessschema kon maken en aanpassen. Zo kon je bestaande lijstjes gebruiken of een nieuwe maken."
    ],
    slug: "fitness-app-frontend",
    url: "https://github.com/jefvanzanten/ADSD-Fase1-Fitness-app",
    languages: ["Java"],
    libraries: [],
    images: [""],
    coverUrl: "/covers/hu_cover.png",
    thumbUrl: "/thumbs/hu_thumb.png",
    category: "Desktop",
    lastUpdated: "2024-03-31",
    highlighted: false
  }
];
const [projects] = createSignal(projects$1);
const useProjects = () => {
  const [selectedLanguages, setSelectedLanguages] = createSignal(
    []
  );
  const [selectedLibraries, setSelectedLibraries] = createSignal([]);
  const filteredProjects = createMemo(() => {
    return projects().filter((project) => {
      if (!project.languages || !project.libraries) {
        return false;
      }
      const languageMatch = selectedLanguages().length === 0 || selectedLanguages().every((lang) => project.languages.includes(lang));
      const libraryMatch = selectedLibraries().length === 0 || selectedLibraries().every((lib) => project.libraries.includes(lib));
      return languageMatch && libraryMatch;
    });
  });
  const toggleLanguage = (language) => {
    setSelectedLanguages(
      (prev) => prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };
  const toggleLibrary = (library) => {
    setSelectedLibraries(
      (prev) => prev.includes(library) ? prev.filter((l) => l !== library) : [...prev, library]
    );
  };
  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedLibraries([]);
  };
  const activeTags = createMemo(() => [
    ...selectedLanguages(),
    ...selectedLibraries()
  ]);
  return {
    projects,
    filteredProjects,
    selectedLanguages,
    selectedLibraries,
    toggleLanguage,
    toggleLibrary,
    clearFilters,
    activeTags
  };
};
const imgContainer = "_imgContainer_1wn5k_39";
const cover = "_cover_1wn5k_63";
const title = "_title_1wn5k_93";
const description = "_description_1wn5k_113";
const tag = "_tag_1wn5k_125";
const styles$1 = {
  "project-card-container": "_project-card-container_1wn5k_1",
  imgContainer,
  cover,
  "project-info": "_project-info_1wn5k_83",
  title,
  description,
  "tag-container": "_tag-container_1wn5k_125",
  tag
};
const socialContainer = "_socialContainer_q8d2x_1";
const logo = "_logo_q8d2x_23";
const p = "_p_q8d2x_47";
const styles = {
  socialContainer,
  logo,
  p
};
var _tmpl$$1 = ["<a", ' target="_blank"><img', "><p", ">", "</p></a>"];
const GithubLink = (props) => {
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("class", escape(styles.socialContainer, true), false) + ssrAttribute("href", escape(props.url, true), false), ssrAttribute("class", escape(styles.logo, true), false) + ssrAttribute("src", escape(props.iconUrl, true), false), ssrAttribute("class", escape(styles.p, true), false), escape(props.name));
};
var _tmpl$ = ["<article", "><button", "><img", ' alt="', '" loading="lazy"></button><section', "><h2", ">", "</h2><p", ">", "</p></section><div", "><!--$-->", "<!--/--><!--$-->", "<!--/--></div><!--$-->", "<!--/--></article>"], _tmpl$2 = ["<span", ">", "</span>"];
const ProjectCard = (props) => {
  const {
    openModal,
    setImageUrl
  } = useImageViewModal();
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = props.project.coverUrl;
          observer.disconnect();
        }
      });
    }, {
      rootMargin: "50px"
    });
    return () => observer.disconnect();
  });
  return ssr(_tmpl$, ssrHydrationKey() + ssrAttribute("class", escape(styles$1["project-card-container"], true), false), ssrAttribute("class", escape(styles$1.imgContainer, true), false), ssrAttribute("class", escape(styles$1.cover, true), false) + ssrAttribute("src", escape(props.project.thumbUrl, true), false), `${escape(props.project.name, true)} cover`, ssrAttribute("class", escape(styles$1["project-info"], true), false), ssrAttribute("class", escape(styles$1.title, true), false), escape(props.project.name), ssrAttribute("class", escape(styles$1.description, true), false), Array.isArray(props.project.description) ? escape(props.project.description.join(" ")) : escape(props.project.description), ssrAttribute("class", escape(styles$1["tag-container"], true), false), escape(createComponent(For, {
    get each() {
      return props.project.libraries;
    },
    children: (library) => ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(styles$1.tag, true), false), escape(library))
  })), escape(createComponent(For, {
    get each() {
      return props.project.languages;
    },
    children: (language) => ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(styles$1.tag, true), false), escape(language))
  })), escape(createComponent(GithubLink, {
    name: "Github",
    iconUrl: "/icons/github-mark-white.svg",
    get url() {
      return props.project.url;
    }
  })));
};
export {
  ProjectCard as P,
  useProjects as u
};
