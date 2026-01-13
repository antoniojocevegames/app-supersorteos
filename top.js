const API_URL = "https://script.google.com/macros/s/AKfycbzLz5X6sz-7v41YK-aNnl1mnBrZbUUM121uqFNNWjOPpqV09L_r_EropNCEYhdULzKplw/exec?action=top";

function renderTop(lista) {
  const body = document.getElementById("topBody");
  body.innerHTML = "";

  if (!lista || !lista.length) {
    body.innerHTML = "<tr><td colspan='3'>Sin datos</td></tr>";
    return;
  }

  lista
    .sort((a, b) => b.tickets - a.tickets)
    .slice(0, 5) // 🏆 TOP 5 REAL
    .forEach((u, i) => {
      const nombreAnonimo = u.nombre.split(" ")[0] + " ⭐";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="rank">${i + 1}</td>
        <td>${nombreAnonimo}</td>
        <td>${u.tickets}</td>
      `;
      body.appendChild(tr);
    });
}

fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    const lista = Array.isArray(data) ? data : data.usuarios;
    renderTop(lista);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("topBody").innerHTML =
      "<tr><td colspan='3'>Error cargando ranking</td></tr>";
  });

// 🔁 auto refresco
setInterval(() => location.reload(), 30000);