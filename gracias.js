function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const orderID = localStorage.getItem("orderID");
  const metodo  = localStorage.getItem("metodo");
  const total   = localStorage.getItem("total");
  const numeros = localStorage.getItem("numeros"); // ya asignados

  doc.setFontSize(14);
  doc.text("Super Sorteos - Comprobante", 20, 20);

  doc.setFontSize(11);
  doc.text(`Order ID: ${orderID}`, 20, 40);
  doc.text(`Método de pago: ${metodo}`, 20, 50);
  doc.text(`Total: ${total}`, 20, 60);
  doc.text(`Números asignados:`, 20, 75);
  doc.text(numeros, 20, 85);

  doc.text("Estado: PENDIENTE DE VERIFICACIÓN", 20, 110);

  doc.save(`SuperSorteos_${orderID}.pdf`);
}