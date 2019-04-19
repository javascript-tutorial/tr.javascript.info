

function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // eğer aralığın dışındaysa silinmelidir.
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}