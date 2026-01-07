import { createComponent, ssr, ssrHydrationKey, ssrAttribute, escape } from "solid-js/web";
import { Suspense, For } from "solid-js";
import { L as Link$1 } from "./router-DjRWwrF-.mjs";
import { u as useProjects, P as ProjectCard } from "./ProjectCard-CB9qMRoe.mjs";
import "./server.mjs";
import "node:async_hooks";
import "node:stream/web";
import "./useImageViewModal-DQHEEIMU.mjs";
const introduction = "_introduction_wyh4v_33";
const title = "_title_wyh4v_67";
const line = "_line_wyh4v_91";
const styles$1 = {
  "content-container": "_content-container_wyh4v_1",
  introduction,
  "button-container": "_button-container_wyh4v_47",
  "featured-projects-container": "_featured-projects-container_wyh4v_57",
  title,
  line,
  "featured-projects-list": "_featured-projects-list_wyh4v_103",
  "loading-text": "_loading-text_wyh4v_121"
};
const button = "_button_1fgem_1";
const styles = {
  button
};
var _tmpl$$1 = ["<button", ">", "</button>"];
function NavButton({
  title: title2,
  to
}) {
  if (to) {
    return createComponent(Link$1, {
      to,
      get ["class"]() {
        return styles.button;
      },
      children: title2
    });
  }
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("class", escape(styles.button, true), false), escape(title2));
}
var _tmpl$ = ["<main", "><div", "><section", "><h1>Full-stack en mobile developer</h1><p>Hey, mijn naam is Jef. Momenteel volg ik de studie Software Development (HBO Associate Degree).<br><br>Ik wissel met programmeren tussen frontend, backend en mobile projecten, zodat mijn kennis en vaardigheden op elk vlak blijven ontwikkelen.</p><div", "><!--$-->", "<!--/--><!--$-->", "<!--/--></div></section><section", "><div", "><span", "></span><h1>Featured Projects</h1><span", "></span></div><div", ">", "</div></section></div></main>"], _tmpl$2 = ["<p", ">Loading...</p>"];
const HomePage = () => {
  const {
    projects
  } = useProjects();
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("class", escape(styles$1["content-container"], true), false), ssrAttribute("class", escape(styles$1.introduction, true), false), ssrAttribute("class", escape(styles$1["button-container"], true), false), escape(createComponent(NavButton, {
    title: "Bekijk projecten",
    to: "/projects"
  })), escape(createComponent(NavButton, {
    title: "Neem contact",
    to: "/contact"
  })), ssrAttribute("class", escape(styles$1["featured-projects-container"], true), false), ssrAttribute("class", escape(styles$1.title, true), false), ssrAttribute("class", escape(styles$1.line, true), false), ssrAttribute("class", escape(styles$1.line, true), false), ssrAttribute("class", escape(styles$1["featured-projects-list"], true), false), escape(createComponent(Suspense, {
    get fallback() {
      return ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(styles$1["loading-text"], true), false));
    },
    get children() {
      return createComponent(For, {
        get each() {
          return projects().filter((project) => project.highlighted);
        },
        children: (project) => createComponent(ProjectCard, {
          project
        })
      });
    }
  })));
};
function RouteComponent() {
  return createComponent(HomePage, {});
}
export {
  RouteComponent as component
};
