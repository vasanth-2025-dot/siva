const ADMIN = { user: "admin", pass: "admin123" };
const USER  = { user: "user",  pass: "user123" };

const DATA_URL = "https://vasanth-2025-dot.github.io/siva/data.json";

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (
    (u === ADMIN.user && p === ADMIN.pass) ||
    (u === USER.user && p === USER.pass)
  ) {
    window.location = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

async function loadData() {
  const res = await fetch(DATA_URL);
  const data = await res.json();

  const foldersDiv = document.getElementById("folders");
  foldersDiv.innerHTML = "";

  data.folders.forEach(folder => {
    let html = `<div class="folder">
      <h3>${folder.name}</h3>
      <ul>`;

    folder.files.forEach(file => {
      html += `
        <li>
          <a href="${file.url}" target="_blank">${file.name}</a>
        </li>`;
    });

    html += `</ul></div>`;
    foldersDiv.innerHTML += html;
  });
}

function detectDevice() {
  const width = window.innerWidth;
  const body = document.body;

  body.classList.remove("mobile", "tablet", "desktop");

  if (width <= 600) {
    body.classList.add("mobile");
  } else if (width <= 1024) {
    body.classList.add("tablet");
  } else {
    body.classList.add("desktop");
  }
}

window.addEventListener("load", detectDevice);
window.addEventListener("resize", detectDevice);

