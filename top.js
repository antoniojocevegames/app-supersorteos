console.log("TOP.JS CARGADO");

const API_URL =
  "https://script.google.com/macros/s/AKfycbzLz5X6sz-7v41YK-aNnl1mnBrZbUUM121uqFNNWjOPpqV09L_r_EropNCEYhdULzKplw/exec?action=top";

function renderTop(lista) {
  const body = document.getElementById("topBody");
  if (!body) return;

  body.innerHTML = "";

  if (!Array.isArray(lista) || !lista.length) {
    body.innerHTML = "<tr><td colspan='3'>Sin datos</td></tr>";
    return;
  }

  lista
    .sort((a, b) => b.tickets - a.tickets)
    .slice(0, 5)
    .forEach((u, i) => {
      body.innerHTML += `
        <tr>
          <td class="rank">${i + 1}</td>
          <td>${u.nombre.split(" ")[0]} ⭐</td>
          <td>${u.tickets}</td>
        </tr>
      `;
    });
}

function refreshTop() {
  fetch(API_URL + "&_ts=" + Date.now())
    .then(r => r.json())
    .then(renderTop)
    .catch(err => {
      console.error(err);
      document.getElementById("topBody").innerHTML =
        "<tr><td colspan='3'>Error cargando datos</td></tr>";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  refreshTop();
  setInterval(refreshTop, 30000);
});