function bosMu(obj) {
  for (let key in obj) {
    // döngü başladıysa obje içinde bir özellik var demektir.
    return false;
  }
  return true;
}