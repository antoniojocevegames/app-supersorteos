let count = 3;
let method = "";
let copyTxt = "";
let selectedNumbers = "";
let orderID = "";
const PRICE_USD = 1;
const RATE_BS = 320; // ⬅️ SOLO CAMBIAS ESTO CADA SEMANA

const paymentMethods = {
    "Pago Móvil": {
        label: "Pago Móvil",
        copy: `0102 8434806 04121865493`
    },
    "Zelle": {
        label: "Zelle",
        copy: `9296030084`
    },
    "Binance": {
        label: "Binance Pay",
        copy: `antonyceden@gmail.com`
    },
    "PayPal": {
        label: "PayPal",
        copy: `luisdioanacordovagomez@gmail.com`
    },
    "Cash App": {
        label: "Cash App",
        copy: `luisdioanacordovagomez@gmail.com`
    }
}

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
    const usd = count * PRICE_USD;
    const bs  = count * RATE_BS;

    document.getElementById("count").innerText = count;

    document.getElementById("totals").innerText =
        `Total: ${usd} USD | ${bs} Bs`;

    document.getElementById("payTotals").innerText =
        `Total: ${usd} USD | ${bs} Bs`;
}

function add(){
    count++;
    updateTotals();
    updateNumbersLimit();
}

function subtract(){
    if(count > 3){
        count--;
        updateTotals();
        updateNumbersLimit();
    }
}

function resetCount(){
    count = 3;
    updateTotals();
    updateNumbersLimit();
}


function handleNumbersInput(input){
    const maxDigits = count * 4;

    // 🔒 bloquear físicamente el input
    input.maxLength = maxDigits + Math.floor(maxDigits / 4);

    // solo números
    let raw = input.value.replace(/\D/g, "");

    // cortar de verdad
    if(raw.length > maxDigits){
        raw = raw.slice(0, maxDigits);
    }

    selectedNumbers = raw;

    // formato visual 4 en 4
    input.value = raw.replace(/(.{4})/g, "$1 ").trim();
}

function updateNumbersLimit(){
    const input = document.getElementById("numsInput");
    if(!input) return;
    handleNumbersInput(input);
}

function trimNumbersToLimit(){
    const input = document.getElementById("numsInput");
    if(!input) return;

    const maxDigits = count * 4;

    let raw = selectedNumbers.replace(/\D/g,"");

    if(raw.length > maxDigits){
        raw = raw.slice(0, maxDigits);
    }

    selectedNumbers = raw;
    input.value = raw.replace(/(.{4})/g, "$1 ").trim();
}

function buildNumbersDisplay(){
    const blocks = [];
    const maxBlocks = count;
    const raw = selectedNumbers || "";

    for(let i = 0; i < maxBlocks; i++){
        const chunk = raw.slice(i*4, i*4 + 4);
        if(chunk.length === 4){
            blocks.push(chunk);
        } else {
            blocks.push("Al azar");
        }
    }

    return blocks.join(" | ");
}

function selectPay(name, id){
    method = name;

    document.querySelectorAll(".payCard")
        .forEach(c => c.classList.remove("selected"));

    document.getElementById(id).classList.add("selected");

    if(paymentMethods[name]){
        copyTxt = paymentMethods[name].copy;
    } else {
        copyTxt = "";
    }
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
    document.getElementById("rUsd").innerText = (count * PRICE_USD) + " USD";
    document.getElementById("rBs").innerText  = (count * RATE_BS) + " Bs";    
    document.getElementById("rNums").innerText = buildNumbersDisplay();

    go(4);
}

function fillFormData(){

    // 🔐 Generar Order ID solo una vez
    if(!orderID){
        orderID = generateOrderID();
    }

    document.getElementById("formOrder").value = orderID;
    document.getElementById("formCant").value = count;
    document.getElementById("formUsd").value = (count * PRICE_USD) + " USD";
    document.getElementById("formBs").value  = (count * RATE_BS) + " Bs";
    document.getElementById("formMetodo").value = method;
    document.getElementById("formNums").value = buildNumbersDisplay();

}

// ---- ORDEN ID 
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
