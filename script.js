let pesanan = {};
let noTransaksi = 1;

function tambah(nama, harga) {
  if (!pesanan[nama]) {
    pesanan[nama] = { harga: harga, qty: 0 };
  }
  pesanan[nama].qty++;
  render();
}

function kurang(nama) {
  pesanan[nama].qty--;
  if (pesanan[nama].qty <= 0) {
    delete pesanan[nama];
  }
  render();
}

function rupiah(angka) {
  return angka.toLocaleString("id-ID");
}

function render() {
document.getElementById("no").textContent = noTransaksi;

let now = new Date();
document.getElementById("waktu").textContent = now.toLocaleString();
  
let nama = document.getElementById("nama").value;
  document.getElementById("namaTampil").textContent = nama || "-";

  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  for (let item in pesanan) {
    let data = pesanan[item];
    let subtotal = data.harga * data.qty;
    total += subtotal;

    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
  <span>${item} x${data.qty}</span>
  <span>Rp ${rupiah(subtotal)}</span>`;

    list.appendChild(div);
  }

  document.getElementById("total").textContent = rupiah(total);
}

function hitung() {
  let total = parseInt(document.getElementById("total").textContent.replace(/\./g,'')) || 0;
  let uang = parseInt(document.getElementById("uang").value) || 0;

  if (uang < total) {
    alert("Uang kurang!");
    return;
  }

  let kembalian = uang - total;

  document.getElementById("kembalian").textContent = rupiah(kembalian);
  document.getElementById("bayarTampil").textContent = rupiah(uang);

  alert("Pembayaran berhasil!");
}

function printStruk() {
  window.print();
}

function resetPesanan() {
  pesanan = {};
  document.getElementById("uang").value = "";
  document.getElementById("kembalian").textContent = 0;
  document.getElementById("bayarTampil").textContent = 0;
  document.getElementById("nama").value = "";

  noTransaksi++;
  render();
}