function renderTop(data) {
  const body = document.getElementById("topBody");
  body.innerHTML = "";

  // soporta array o { usuarios: [] }
  const listaOriginal = Array.isArray(data) ? data : data.usuarios;

  if (!listaOriginal || !listaOriginal.length) {
    body.innerHTML = "<tr><td colspan='3'>Sin datos</td></tr>";
    return;
  }

  // 🔥 CLONAR antes de ordenar (CLAVE)
  const top5 = [...listaOriginal]
    .sort((a, b) => Number(b.tickets) - Number(a.tickets))
    .slice(0, 5);

  top5.forEach((u, i) => {
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

// 🔁 Auto refresco cada 30s
setInterval(() => location.reload(), 30000);