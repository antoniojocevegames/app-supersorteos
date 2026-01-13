const API_URL = "https://script.google.com/macros/s/1EuaGRD1aZh9QSQM4D-tzWEFkG3EZgCTBKWyoCmCtlgpE9p3GOrv0XhWx/exec?action=top";

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const body = document.getElementById("topBody");
        body.innerHTML = "";

        if (!data.length) {
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
      })
      .catch(() => {
        document.getElementById("topBody").innerHTML =
          "<tr><td colspan='3'>Error cargando datos</td></tr>";
      });