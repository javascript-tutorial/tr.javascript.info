function kacGunOnce(tarih, gun) {
  let tarihKopyasi = new Date(tarih);

  tarihKopyasi.setDate(tarih.getDate() - gun);
  return tarihKopyasi.getDate();
}
