import styles from "./Navigation.module.css";
import Hamburger from "../ui/Hamburger/Hamburger";
import { createSignal, For, createMemo, Show, type Component } from "solid-js";
import { Link, useLocation } from "@tanstack/solid-router";

const Navigation: Component = () => {
  // state used for the hamburger menu
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const navItems = [
    { to: "/projects", name: "Projecten" },
    { to: "/contact", name: "Contact" },
  ];

  // variable that saves the current location
  const location = useLocation();

  // Save the active navigation item in a variable
  const activeItem = createMemo(() => {
    const currentPath = location().pathname;

    // If on homepage, return null (no active item to display)
    if (currentPath === "/") return null;

    // Check for exact match first
    const exactMatch = navItems.find((item) => item.to === currentPath);
    if (exactMatch) return exactMatch;

    // Then check for path prefix (for nested routes)
    const prefixMatch = navItems.find((item) =>
      currentPath.startsWith(item.to)
    );

    return prefixMatch ?? null;
  });

  // Toggle function for the hamburger menu
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  // If the menu is toggled and the user clicked a link it needs to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div class={styles.navcontainer}>
      <nav class={styles.nav}>
        <Hamburger isOpen={isMenuOpen()} onClick={toggleMenu} />

        <Link
          to="/"
          class={`${styles.navlink} ${styles.logo}`}
          onClick={closeMenu}
        >
          JEFVANZANTEN.DEV
        </Link>
        <Show when={activeItem()}>
          {(item) => (
            <Link to={item().to} class={styles.pageName}>
              {item().name}
            </Link>
          )}
        </Show>

        <div class={`${styles.navlist} ${isMenuOpen() ? styles.open : ""}`}>
          <For each={navItems}>
            {(item) => (
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ class: `${styles.navlink} ${styles.active}` }}
                inactiveProps={{ class: styles.navlink }}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            )}
          </For>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
