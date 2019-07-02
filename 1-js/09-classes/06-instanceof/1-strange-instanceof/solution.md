Gerçekten de garip.

Fakat `instanceof` aslında fonksiyonu umursamaz, bunun yerine bunun `prototype`'ını umursar ve bu prototip zinciriyle karşılaştırılır.

Burada `a.__proto__ == B.prototype`, bundan dolayı `instanceof`, `true` dönecektir.

Öyleyse, `instanceof` mantığına göre asıl tipi gelirleyen `prototiptir`, yapıcı fonksiyon değil.