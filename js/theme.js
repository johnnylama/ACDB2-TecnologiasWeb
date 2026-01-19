(() => {
    const storageKey = "theme-preference";
    const root = document.documentElement;
    const toggle = document.querySelector(".theme-toggle");

    if (!toggle) {
        return;
    }

    const label = toggle.querySelector(".theme-label");
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const getStoredTheme = () => {
        try {
            return localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    };

    const applyTheme = (theme) => {
        const nextTheme = theme === "dark" ? "dark" : "light";
        root.setAttribute("data-theme", nextTheme);
        root.setAttribute("data-bs-theme", nextTheme);
        toggle.setAttribute("aria-pressed", nextTheme === "dark" ? "true" : "false");
        if (label) {
            label.textContent = nextTheme === "dark" ? "Modo claro" : "Modo oscuro";
        }
    };

    const storedTheme = getStoredTheme();
    const initialTheme =
        storedTheme === "dark" || storedTheme === "light"
            ? storedTheme
            : prefersDark
                ? "dark"
                : "light";

    applyTheme(initialTheme);

    toggle.addEventListener("click", () => {
        const currentTheme =
            root.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);

        try {
            localStorage.setItem(storageKey, nextTheme);
        } catch {
            // Storage can fail in private mode; ignore and continue.
        }
    });
})();
