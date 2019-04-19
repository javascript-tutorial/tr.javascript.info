function Toplayici(baslangicDegeri) {
  this.deger = baslangicDegeri;

  this.oku = function () {
    this.oku += +prompt('Kaç eklemek istersiniz?', 0);
  };

}
