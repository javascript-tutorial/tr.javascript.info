function yerelGunAl(tarih) {

  let gun = tarih.getDay();

  if (gun == 0) { // Eğer normal haftanın günü 0 ( pazar ) ise bu avrupa takvimine göre 7 olmakta.
    gun = 7;
  }

  return gun;
}
