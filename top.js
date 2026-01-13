function renderTop(data) {
  const body = document.getElementById("topBody");
  body.innerHTML = "";

  if (!data || !data.length) {
    body.innerHTML = "<tr><td colspan='3'>Sin datos</td></tr>";
    return;
  }

  data
    .sort((a, b) => b.tickets - a.tickets)
    .forEach((u, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="rank">${i + 1}</td>
        <td>${u.nombre}</td>
        <td>${u.tickets}</td>
      `;
      body.appendChild(tr);
    });
}