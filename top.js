const API_URL = "https://script.google.com/macros/s/AKfycbzLz5X6sz-7v41YK-aNnl1mnBrZbUUM121uqFNNWjOPpqV09L_r_EropNCEYhdULzKplw/exec?action=top&callback=renderTop";

function renderTop(data) {
  const body = document.getElementById("topBody");
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
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="rank">${i + 1}</td>
        <td>${u.nombre.split(" ")[0]} ⭐</td>
        <td>${u.tickets}</td>
      `;
      body.appendChild(tr);
    });
}

// 🔄 REFRESH SIN RECARGAR
function refreshTop() {
  const oldScript = document.getElementById("jsonpTop");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "jsonpTop";
  script.src = API_URL + "&_ts=" + Date.now(); // evita cache
  document.body.appendChild(script);
}

// ⏱ Primera carga
refreshTop();

// 🔁 Cada 30 segundos
setInterval(refreshTop, 30000);