function benzersiz(arr) {
  let sonuc = [];

  for (let str of arr) {
    if (!sonuc.includes(str)) {
      sonuc.push(str);
    }
  }

  return sonuc;
}
