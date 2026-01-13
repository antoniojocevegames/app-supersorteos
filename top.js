fetch("https://script.google.com/macros/s/1EuaGRD1aZh9QSQM4D-tzWEFkG3EZgCTBKWyoCmCtlgpE9p3GOrv0XhWx/exec?action=topUsuarios")
  .then(r => r.json())
  .then(data => {
    const tbody = document.querySelector("#topTable tbody");
    tbody.innerHTML = "";

    data.usuarios.forEach((u, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${u.nombre}</td>
        <td>${u.tickets}</td>
      `;
      tbody.appendChild(tr);
    });
  });
