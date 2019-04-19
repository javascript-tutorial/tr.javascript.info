

```js run demo
let userName = prompt("Kim var orada?", '');

if (userName == 'Admin') {

  let pass = prompt('Şifre?', '');

  if (pass == 'BüyükPatron') {
    alert( 'Merhaba!' );
  } else if (pass == null) {
    alert( 'İptal Edildi.' );
  } else {
    alert( 'Yanlış Şifre' );
  }

} else if (userName == null) {
  alert( 'İptal Edildi' );
} else {
  alert( "Seni tanımıyorum" );
}
```
`if` flokları arasındaki dikeyde bulunan boşluklara dikkat edin. Bu teknik olarak gerekli olmasa da okunabilirliği artırmaktadır.
