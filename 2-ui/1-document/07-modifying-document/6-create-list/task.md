importance: 4

---

# Create a List

Kullanıcı girdisinden bir liste oluşturmak için bir arayüz yazın.

Her liste maddesi için:

<<<<<<< HEAD
1. 'Komut istem'(`prompt`)i kullanarak bir kullanıcıya içeriği hakkında sorun.
2.Onunla `<li>`yi yarat ve onu `<ul>`ye ekle.
3. Kullanıcı girişi iptal edene kadar devam edin (komut isteminde `tuş:Esc` veya CANCEL'a basarak). 
=======
1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

Tüm elementler dinamik olarak oluşturulmalıdır.

Eğer bir kullanıcı HTML etiketleri(tags) yazıyorsa, onlara metin gibi davranılmalıdır.

[demo src="solution"]
