importance: 1

---

# Why does "aaa" remain?

<<<<<<< HEAD
Örneği çalıstırın. Niçin `table.remove()`, `"aaa"` metnini silmez?
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
</script>
```
