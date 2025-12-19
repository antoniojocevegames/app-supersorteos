window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const pdfUrl = params.get("pdf");

  console.log("PDF URL:", pdfUrl);

  const btn = document.getElementById("btnPdf");

  if (!btn) {
    console.error("❌ Botón btnPdf no existe en el DOM");
    return;
  }

  if (!pdfUrl) {
    console.warn("⚠️ No llegó la URL del PDF");
    return;
  }

  btn.style.display = "inline-block";

  btn.onclick = () => {
    window.open(decodeURIComponent(pdfUrl), "_blank");
  };
};
