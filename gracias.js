document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const pdfUrl = params.get("pdf");

  const btn = document.getElementById("btnPdf");

  if (!pdfUrl) {
    console.warn("No se recibió PDF");
    return;
  }

  btn.style.display = "block";

  btn.addEventListener("click", () => {
    window.open(pdfUrl, "_blank");
  });

});
