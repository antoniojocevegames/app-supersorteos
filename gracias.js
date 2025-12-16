const { jsPDF } = window.jspdf;

// Recuperar datos
const orderID = localStorage.getItem("orderID");
const metodo  = localStorage.getItem("metodo");
const total   = localStorage.getItem("total");

document.getElementById("order").innerText  = orderID || "-";
document.getElementById("metodo").innerText = metodo || "-";
document.getElementById("nums").innerText   = numeros || "-";
document.getElementById("total").innerText  = total || "-";

function generatePDF(){
    const pdf = new jsPDF();

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Super Sorteos", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Order ID: ${orderID}`, 20, 40);
    pdf.text(`Método de pago: ${metodo}`, 20, 50);
    pdf.text(`Total: ${total}`, 20, 70);

    pdf.text("Gracias por tu compra.", 20, 95);

    pdf.save(`Factura-${orderID}.pdf`);
}

localStorage.clear();

