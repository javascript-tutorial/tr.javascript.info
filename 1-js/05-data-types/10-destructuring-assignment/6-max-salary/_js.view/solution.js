function azamiMaas(maaslar) {

  let max = 0;
  let maxName = null;

  for (let [isim, maas] of Object.entries(maaslar)) {
    if (max < maas) {
      max = maas;
      maxName = isim;
    }
  }

  return maxName;
}


