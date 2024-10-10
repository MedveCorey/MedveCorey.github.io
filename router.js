const routes = {
  "/": "index.html",
  "/about": "index.html#about",
  "/projects": "index.html#projects",
  "/contact": "index.html#contact",
  "/visual-journal": "visual-journal.html",
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
