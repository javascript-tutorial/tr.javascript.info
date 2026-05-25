function toplamMaas(maaslar) {

  let toplam = 0;
  for (let maas of Object.values(maaslar)) {
    toplam += maas;
  }

  return toplam;
}

