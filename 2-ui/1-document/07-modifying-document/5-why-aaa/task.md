importance: 1

---

# Why does "aaa" remain?

<<<<<<< HEAD
Örneği çalıstırın. Niçin `table.remove()`, `"aaa"` metnini silmez?
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // tablo, olması gerektiği gibi

  table.remove();
<<<<<<< HEAD
  // niçin belgenin içinde hala 'aaa' var?
=======
  // why there's still "aaa" in the document?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
</script>
```
