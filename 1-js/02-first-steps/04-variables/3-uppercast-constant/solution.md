Genelde tamamı büyük harf değişleri "sabit kodlanmış" değerler için. Veya kod çalışmadan bilinen değerler için kullanılır.

Bu kod cümlesinde `dogumGunu` tam da bu tanıma uymaktadır. Bundan dolayı büyük harf ile kullanılabilir.

<<<<<<< HEAD
Buna karşı `yaş` değişkeni bir fonksiyonun çıktısına göre değer almaktadır. Bu gün diyelim ki 20 yaşındaysanız bir yıl sonra 21 yaşında olacaksınız demektir. Tabi bu kural kod çalıştığında değişmez. Yani yıla göre değer alacaktır cümlesi değişmeyecektir. Fakat değer değiştiğinden dolayı `dogumGunu` değişkenine göre daha az sabittir. Hesaplanan bir değerdir. Bundan dolayı bunu küçük harfle tutmanız gerekmektedir.
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269
