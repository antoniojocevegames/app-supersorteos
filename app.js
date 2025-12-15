let count = 3;
let method = "";
let copyTxt = "";
let selectedNumbers = "";
let orderID = "";

function go(n){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("s"+n).classList.add("active");
}

function toggleTerms(){
    const p = document.getElementById("terms");
    p.style.display = p.style.display === "block" ? "none" : "block";
}

function validateTerms(){
    const c = document.getElementById("chkT");
    const btn = document.getElementById("btn1");

    if(c.checked){
        btn.classList.remove("disabled");
        btn.classList.add("active"); // 🔥 animación
        btn.onclick = () => go(2);
    } else {
        btn.classList.add("disabled");
        btn.classList.remove("active");
        btn.onclick = null;
    }
}

function updateTotals(){
    document.getElementById("count").innerText = count;
    document.getElementById("totals").innerText = `Total: ${count} USD | ${count*100} Bs`;
    document.getElementById("payTotals").innerText = `Total: ${count} USD | ${count*100} Bs`;
}

function add(){ count++; updateTotals(); }
function subtract(){ if(count > 3){ count--; updateTotals(); } }
function resetCount(){ count = 3; updateTotals(); }

function formatNums(input){
    let raw = input.value.replace(/\D/g,"");
    selectedNumbers = raw;
    input.value = raw.replace(/(.{4})/g,"$1 ").trim();
}

function selectPay(name,id){
    method = name;
    document.querySelectorAll(".payCard").forEach(c => c.classList.remove("selected"));
    document.getElementById(id).classList.add("selected");

    if(name==="Pago Móvil")
        copyTxt="Banco BBVA\nTel: 643107865\nRIF: Z2035460B\nCódigo: 0102";
    if(name==="Zelle")
        copyTxt="Zelle:\nantoniojosecedenoveliz@gmail.com";
    if(name==="Binance")
        copyTxt="Binance Pay ID:\nantoniojoceve";
    if(name==="PayPal")
        copyTxt="PayPal:\nantoniofebrero24@gmail.com";
}

function copyData(){
    if(!copyTxt){ alert("Seleccione un método de pago"); return; }
    navigator.clipboard.writeText(copyTxt);
    alert("Datos copiados");
}

if(!orderID){
    orderID = generateOrderID();
}
document.getElementById("rOrder").innerText = orderID;

function validatePay(){
    if(!method){ alert("Seleccione un método de pago"); return; }

    document.getElementById("rMetodo").innerText = method;
    document.getElementById("rCant").innerText = count;
    document.getElementById("rUsd").innerText = count+" USD";
    document.getElementById("rBs").innerText = (count*100)+" Bs";
    document.getElementById("rNums").innerText = selectedNumbers ? selectedNumbers.replace(/(.{4})/g,"$1 ").trim() : "Al azar";

    go(4);
}

function fillFormData(){

    // 🔐 Generar Order ID solo una vez
    if(!orderID){
        orderID = generateOrderID();
    }

    document.getElementById("formOrder").value = orderID;
    document.getElementById("formCant").value = count;
    document.getElementById("formUsd").value = count + " USD";
    document.getElementById("formBs").value = (count * 100) + " Bs";
    document.getElementById("formMetodo").value = method;
    document.getElementById("formNums").value =
        selectedNumbers
        ? selectedNumbers.replace(/(.{4})/g,"$1 ").trim()
        : "Al azar";
}

// ---- ORDEN ID 
// 
// - GENERADOR DE CODIGO
function generateOrderID(){
    const prefix = "SS";
    const date = new Date();

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    const rnd = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${y}${m}${d}-${rnd}`;
}
