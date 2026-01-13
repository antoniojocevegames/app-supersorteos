console.log("TOP.JS CARGADO");

const API_URL = "https://script.google.com/macros/s/AKfycbzLz5X6sz-7v41YK-aNnl1mnBrZbUUM121uqFNNWjOPpqV09L_r_EropNCEYhdULzKplw/exec?action=top&callback=renderTop";

// 👉 JSONP callback (DEBE ser global)
window.renderTop = function (data) {
  const body = document.getElementById("topBody");
  if (!body) return;

  body.innerHTML = "";

  const lista = Array.isArray(data) ? data : data.usuarios;

  if (!lista || !lista.length) {
    body.innerHTML = "<tr><td colspan='3'>Sin datos</td></tr>";
    return;
  }

  lista
    .sort((a, b) => b.tickets - a.tickets)
    .slice(0, 5) // 🏆 TOP 5
    .forEach((u, i) => {
      body.innerHTML += `
        <tr>
          <td class="rank">${i + 1}</td>
          <td>${u.nombre.split(" ")[0]} ⭐</td>
          <td>${u.tickets}</td>
        </tr>
      `;
    });
};

// 🔄 Carga / refresco JSONP
function refreshTop() {
  const old = document.getElementById("jsonpTop");
  if (old) old.remove();

  const s = document.createElement("script");
  s.id = "jsonpTop";
  s.src = API_URL + "&_ts=" + Date.now(); // evita cache
  document.body.appendChild(s);
}

// ⏱ Arranque seguro (DOM listo)
document.addEventListener("DOMContentLoaded", () => {
  refreshTop();
  setInterval(refreshTop, 30000);
});