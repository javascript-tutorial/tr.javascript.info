importance: 1

---

# Why does "aaa" remain?

<<<<<<< HEAD
Örneği çalıstırın. Niçin `table.remove()`, `"aaa"` metnini silmez?
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

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
  // niçin belgenin içinde hala 'aaa' var?
</script>
```
