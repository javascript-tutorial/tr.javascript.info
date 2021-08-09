importance: 5

---

# Sort the table

Bir tablo var:

```html run
<table>
<<<<<<< HEAD
<tr>
  <th>İsim</th>
  <th>Soyisim</th>
  <th>Yaş</th>
</tr>
<tr>
  <td>John</td>
  <td>Smith</td>
  <td>10</td>
</tr>
<tr>
  <td>Pete</td>
  <td>Brown</td>
  <td>15</td>
</tr>
<tr>
  <td>Ann</td>
  <td>Lee</td>
  <td>5</td>
</tr>
<tr>
  <td>...</td>
  <td>...</td>
  <td>...</td>
</tr>
=======
<thead>
  <tr>
    <th>Name</th><th>Surname</th><th>Age</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>John</td><td>Smith</td><td>10</td>
  </tr>
  <tr>
    <td>Pete</td><td>Brown</td><td>15</td>
  </tr>
  <tr>
    <td>Ann</td><td>Lee</td><td>5</td>
  </tr>
  <tr>
    <td>...</td><td>...</td><td>...</td>
  </tr>
</tbody>
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
</table>
```

Belki içinde daha çok satır var.

`"name"` sütunu tarafından sıralanması için kodu buraya yazın.
