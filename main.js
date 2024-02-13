const harcamaInput = document.querySelector("#harcama-input");
const fiyatInput = document.querySelector("#fiyat-input");
const addBtn = document.querySelector(".add-btn");
const Liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const deleteBtn = document.querySelector("#delete");
const payBtn = document.querySelector("#payment");
const CheckedInput = document.querySelector("#checkedInput");
const Filter = document.querySelector("#filter-select");

// izleme işlemi
addBtn.addEventListener("click", addExpense);
Liste.addEventListener("click", handleClick);
Filter.addEventListener("change", handleFilter);

//Toplam State'i

let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

// harcama oluşturma
function addExpense(e) {
  // bu kodu yazmazsak butona tıkladığımızda sayfayı yeniliyordu
  e.preventDefault();
  if (harcamaInput.value != "" && fiyatInput.value != "") {
    // Div oluşturma Kısmı
    const harcamaDiv = document.createElement("div");

    // class ekleme
    harcamaDiv.classList.add("harcama");
    if (CheckedInput.checked) {
      harcamaDiv.classList.add("payed");
    }

    // oluşturduğumuz div in içeriğini ayarlama
    harcamaDiv.innerHTML = `
          <h2>${harcamaInput.value}</h2>
          <h2 id="price" >${fiyatInput.value}</h2>
          <div class="buttons">
            <img id="payment" src="/images/payment.png" />
            <img id="delete" src="/images/delete.png" />
          </div> 
  `;

    // oluşan harcamayı html e gönderme(Listeye ekleme)
    Liste.appendChild(harcamaDiv);

    // toplamı güncelle
    updateToplam(fiyatInput.value);

    //formu temizleme

    harcamaInput.value = "";
    fiyatInput.value = "";
  } else {
    alert("Formları Doldurun");
  }
}

function handleClick(e) {
  const eleman = e.target;

  if (eleman.id === "delete") {
    const kapsayiciEleman = eleman.parentElement.parentElement;

    // silinecek elemanın fiyatını alma
    const silinecekDeğerElemanı = kapsayiciEleman.querySelector("#price");
    const deletedPrice = Number(silinecekDeğerElemanı.innerText);

    //silinen elemanın fiyatını toplamdan çıkarma

    updateToplam(-Number(deletedPrice));

    //kapsayıcıyı ekrandan silme
    kapsayiciEleman.remove();
  }
}

// filtreleme işlemi
function handleFilter(e) {
  console.log(e.target.value);
  // listenin içindeki elemanları aldık
  const items = Liste.childNodes;
  // ve for each la döndük
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
