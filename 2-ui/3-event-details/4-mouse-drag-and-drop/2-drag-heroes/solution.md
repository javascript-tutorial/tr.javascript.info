<<<<<<< HEAD
Öğeyi sürüklemek için `position:fixed` kullanabiliriz, koordinatların yönetilmesini kolaylaştırır. Ancak sonunda onu tekrar eski konumuna getirmeliyiz: `position:absolute`.

Ardından, koordinatlar pencerenin üstünde / altında olduğunda, kaydırmak için `window.scrollTo` kullanırız.
=======
To drag the element we can use `position:fixed`, it makes coordinates easier to manage. At the end we should switch it back to `position:absolute` to lay the element into the document.

When coordinates are at window top/bottom, we use `window.scrollTo` to scroll it.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Kodun içindeki yorumlarda daha fazla ayrıntı bulabilirsiniz.
