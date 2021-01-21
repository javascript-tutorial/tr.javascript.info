importance: 1

---

# Why does "aaa" remain?

Örnegi çalıstırın. Niçin `table.remove()`, `"aaa"` metnini silmez?

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
