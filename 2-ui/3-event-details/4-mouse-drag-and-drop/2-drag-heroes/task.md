importance: 5

---
# Sahada süper kahramanları sürükleyin

Bu görev, Drag'n'Drop (sürükle bırak) ve DOM'un çeşitli yönlerini anlamanıza yardımcı olacaktır.

Tüm öğeleri `draggable` sınıfıyla - sürüklenebilir yapın. Bölümdeki top gibi.

Gereksinimler:

- Sürükleme başlangıcını izlemek için olay delegasyonunu kullanın:  `mousedown` için `document`" üzerinde tek bir olay dinleyicisi yeterli.
- Öğeler pencerenin üst / alt kenarlarına sürüklenirse - daha fazla sürüklemeye izin vermek için sayfa yukarı / aşağı kayar.
- Yatay kaydırma yok.
- Sürüklenebilir öğeler, hızlı fare hareketlerinden sonra bile tarayıcıdan/pencereden asla ayrılmamalıdır.

<<<<<<< HEAD
Demo buraya sığamayacak kadar büyük, link burada.
=======
- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges -- the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.

The demo is too big to fit it here, so here's the link.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

[demo src="solution"]
