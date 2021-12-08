const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevBtnEkle = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");
yeniGorevBtnEkle.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSil);

document.addEventListener("DOMContentLoaded", localStorageOku);


function gorevItemOlustur(gorev) {
    const gorevDiv = document.createElement("div");
    gorevDiv.classList.add("gorev-item");
    const gorevLi = document.createElement("li");
    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerText = gorev;

    gorevDiv.appendChild(gorevLi);

    gorevListesi.appendChild(gorevDiv);


    const gorevTamamlandiBtn = document.createElement("button");
    gorevTamamlandiBtn.classList.add("gorev-btn");
    gorevTamamlandiBtn.classList.add("gorev-btn-tamamlandi");

    gorevTamamlandiBtn.innerHTML = '<i class="far fa-check-square"></i>';

    gorevDiv.appendChild(gorevTamamlandiBtn);

    const gorevSilBtn = document.createElement("button");
    gorevSilBtn.classList.add("gorev-btn");
    gorevSilBtn.classList.add("gorev-btn-sil");

    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';

    gorevDiv.appendChild(gorevSilBtn);


}
function gorevEkle(e) {
    e.preventDefault();
    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = "";
    }
    else {
        alert("bos kelime girme");
    }


}



function gorevSil(e) {

    const tiklanilanEleman = e.target;
    if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
        tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
    }
    else if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {

        if (confirm("emin misiniz?")) {
            tiklanilanEleman.parentElement.classList.add("kaybol");


            tiklanilanEleman.parentElement.addEventListener("transitionend", function () {
                tiklanilanEleman.parentElement.remove();
            });


            const silinecekEleman = tiklanilanEleman.parentElement.children[0].innerText;
            localStoragedanSil(silinecekEleman);
        }


    }





}
function localStorageKaydet(yeniGorev) {
    let gorevler;
    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    gorevler.push(yeniGorev);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
function localStorageOku() {
    let gorevler;
    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    gorevler.forEach(gorev => {
        gorevItemOlustur(gorev);
    });

}
function localStoragedanSil(gorev) {
    let gorevler;
    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    }
    else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    const silinenecekEleman = gorevler.indexOf(gorev);

    gorevler.splice(silinenecekEleman, 1);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));


}