const routes = {
  "/": { title: "Home", template: "index.html" },
  "/about": { title: "About", template: "index.html#about" },
  "/projects": { title: "Projects", template: "index.html#projects" },
  "/contact": { title: "Contact", template: "index.html#contact" },
  "/visual-journal": {
    title: "Visual Journal",
    template: "visual-journal.html",
  },
};

function router() {
  const path = window.location.pathname;
  const route = routes[path] || "index.html";

  fetch(route)
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;
      if (route.includes("#")) {
        const id = route.split("#")[1];
        document.getElementById(id).scrollIntoView();
      }
    });
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState({}, "", e.target.getAttribute("href"));
      router();
    }
  });
});
