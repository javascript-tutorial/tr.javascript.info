Tek eşleşme boş bir dizidir: metin başlar ve hemen biter.

Bu örnek, çapaların karakterler değil, testler olduğunu bir kez daha gösteriyor.

Dizi (string) boştur `""`. Regexp motoru öncelikle `pattern:^` çapasıyla eşleşir (satır başı), evet burada, daha sonra satır sonu gelir `pattern:$`, satır sonu da burada `""`. Böylece dizi ile kalıp eşleşmiş olur.
