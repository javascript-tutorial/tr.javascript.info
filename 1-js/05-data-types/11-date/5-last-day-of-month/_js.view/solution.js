function ayinSonGunu(yil, ay) {
  let tarih = new Date(yil, ay + 1, 0);
  return tarih.getDate();
}
