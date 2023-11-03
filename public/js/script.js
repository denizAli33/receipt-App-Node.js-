let malBirAdet = document.getElementById('malBirAdet');
let malBirSafi = document.getElementById('malBirSafi');
let malBirFiyat = document.getElementById('malBirFiyat');
let malBirTutar = document.getElementById('malBirTutar');
let malIkiAdet = document.getElementById('malIkiAdet');
let malIkiSafi = document.getElementById('malIkiSafi');
let malIkiFiyat = document.getElementById('malIkiFiyat');
let malIkiTutar = document.getElementById('malIkiTutar');
let malUcAdet = document.getElementById('malUcAdet');
let malUcSafi = document.getElementById('malUcSafi');
let malUcFiyat = document.getElementById('malUcFiyat');
let malUcTutar = document.getElementById('malUcTutar');
let totalAdet = document.getElementById('totalAdet');
let totalSafi = document.getElementById('totalSafi');
let totalTutar = document.getElementById('totalTutar');
let calculateBtn = document.getElementById('calculateReceipts')

calculateBtn.addEventListener('click', ()=>{
    malBirTutar.value = parseFloat(malBirSafi.value) * parseFloat(malBirFiyat.value);
    malIkiTutar.value = parseFloat(malIkiSafi.value) * parseFloat(malIkiFiyat.value);
    malUcTutar.value = parseFloat(malUcSafi.value) * parseFloat(malUcFiyat.value);
    if(malBirAdet.value==0){
        totalAdet.value= parseFloat(malBirAdet.value) + parseFloat(malIkiAdet.value) + parseFloat(malUcAdet.value);
    }else{
        totalAdet.value = malBirAdet.value;
    }
    totalSafi.value = parseFloat(malBirSafi.value) + parseFloat(malIkiSafi.value) + parseFloat(malUcSafi.value);
    totalTutar.value = parseFloat(malBirTutar.value) + parseFloat(malIkiTutar.value) + parseFloat(malUcTutar.value);
});