function haftaninGunleriniAl(tarih) {
  let gunler = ['PT', 'SA', 'ÇA', 'PR', 'CM', 'CT', 'PZ'];

  return gunler[tarih.getDay()];
}
