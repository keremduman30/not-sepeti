// simdi butonlara ve girdilere eriserek evenleri yapaılm
const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevBtnEkle = document.querySelector(".btn-gorev-ekle");
//gorev listesindi de secelim ul li olanlar
const gorevListesi = document.querySelector(".gorev-listesi");
yeniGorevBtnEkle.addEventListener("click", gorevEkle);
//simdi silme ve tamamlama ul nin içinde old için biz satırı secip event dinliyecez sil ise işte fonksiyon yazdıracaz
gorevListesi.addEventListener("click", gorevSil);

//eger site acılır acılmaz bir işlem yapmak istiyorsak soyle deriz
document.addEventListener("DOMContentLoaded", localStorageOku);


function gorevItemOlustur(gorev) {
    const gorevDiv = document.createElement("div");
    gorevDiv.classList.add("gorev-item");
    //li yi olusturma
    const gorevLi = document.createElement("li");
    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerText = gorev;
    //olusturdugmuz liyi divin içine atalım
    gorevDiv.appendChild(gorevLi);
    //simdi diviide ulnin içine atmalıyız
    gorevListesi.appendChild(gorevDiv);

    //simdi gorev-btn-tamamlandi ekliyelim
    const gorevTamamlandiBtn = document.createElement("button");
    gorevTamamlandiBtn.classList.add("gorev-btn");
    gorevTamamlandiBtn.classList.add("gorev-btn-tamamlandi");
    //simdi iconu btn içine atalım ama bu bir html yani <i> işte buunn için innerhtml ditecez
    gorevTamamlandiBtn.innerHTML = '<i class="far fa-check-square"></i>';
    //simdi butonuda gorevdive koymak lazım
    gorevDiv.appendChild(gorevTamamlandiBtn);
    //simdi delete btn ekliyelim
    const gorevSilBtn = document.createElement("button");
    gorevSilBtn.classList.add("gorev-btn");
    gorevSilBtn.classList.add("gorev-btn-sil");
    //simdi iconu btn içine atalım ama bu bir html yani <i> işte buunn için innerhtml ditecez
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    //simdi butonuda gorevdive koymak lazım
    gorevDiv.appendChild(gorevSilBtn);
    //eklenen gorevleri locale kaydet diyelim

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
    //target eleman degerini getirir comple
    //simdi gorevtamamlandi classini biz csste text üzerini cizmistik işte eger turuncu butona tıklarsa biz bu clasi eklemek lzm
    //eger o class varsada silmesi lazım bu fonksiyonu yapan sey jsde toggle dur 
    const tiklanilanEleman = e.target;
    if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
        //simdi eger tuurnc buton tıklanırsa once biz parentine ulasıp  bu parentine yani div oluyor ona bu class ozelligi ekliyoruz 
        tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");//toggle eger varsa siler yoksa ekler 
    }
    else if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {
        //comfirm bi diyalog penceresidir evete astıgında calsırı
        if (confirm("emin misiniz?")) {
            tiklanilanEleman.parentElement.classList.add("kaybol");
            //yukarıdaki ekledigmiz kaybol classı animasyonlu silme dir ama animasyonu beklemeden asagıdaki metod calsııtgı için gormuyoz
            //bunun için parentine bir event verip işlem bitmeden asagını calstırma ddiycaz

            tiklanilanEleman.parentElement.addEventListener("transitionend", function () {
                tiklanilanEleman.parentElement.remove();
            });
            // tiklanilanEleman.parentElement.remove();
            //simdi silinen elemanın parent,ne gidip ilk cocgu olan liyinin contentini localden silecez cunku kayılar contentseklinde

            const silinecekEleman = tiklanilanEleman.parentElement.children[0].innerText;
            localStoragedanSil(silinecekEleman);
        }


    }
    //transitionend :bklemedir 




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
    const silinenecekEleman = gorevler.indexOf(gorev);//gorevler içindeki o eleamn indexi ni aldık
    //simdi localden sielelm birden fazla cesit var biz splice ile silecez

    gorevler.splice(silinenecekEleman, 1);
    //sildikten sonra olsuan yeni diziyi gene locale yazdırmak lazım
    localStorage.setItem("gorevler", JSON.stringify(gorevler));


}