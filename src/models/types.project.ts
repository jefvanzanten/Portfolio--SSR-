export type Language = "TypeScript" | "CSS" | "Kotlin" | "Java";

export type Category =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Fullstack"
  | "Desktop";

export type Library =
  | "React"
  | "TailwindCSS"
  | "React-Router"
  | "Express"
  | "Drizzle"
  | "Better-Auth"
  | "TanStackQuery"
  | "Nextjs"
  | "React-Native"
  | "JetpackCompose"
  | "Jest"
  | "RoomDB"
  | "JavaFX";

export type Project = {
  id: number;
  name: string;
  description: string | string[];
  slug: string;
  url: string;
  languages: Language[];
  libraries: Library[];
  images: string[];
  category: Category;
  lastUpdated: string;
  highlighted: boolean;
  coverUrl: string;
  thumbUrl: string;
};
