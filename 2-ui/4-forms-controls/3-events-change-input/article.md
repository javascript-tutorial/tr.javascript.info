# Olaylar: change, input, cut, copy, paste

Hadi veri güncellemelerine eşlik eden çeşitli olayları tartışalım.

## Olay: change

[change olayı](http://www.w3.org/TR/html5/forms.html#event-input-change) öğe değişmeyi bitirdiğinde tetiklenir.

Bu olay metin girişleri için odak kaybedildiği zaman meydana gelir.

Örneğin, aşağıdaki metin alanına bir şey yazarken olay yok. Ama odağı başka bir yere taşıdığımızda, örneğin, butona tıkladığımızda bir `change` olayı olacak:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

`select`, `input type=checkbox/radio` elementlerde ise olay, elementteki değişiklikten hemen sonra tetiklenir.

## Event: input

The `input` event triggers every time a value is modified.

For instance:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

If we want to handle every modification of an `<input>` then this event is the best choice.

Unlike keyboard events it works on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

```smart header="Can't prevent anything in `oninput`"
The `input` event occurs after the value is modified.

So we can't use `event.preventDefault()` there -- it's just too late, there would be no effect.
```

## Events: cut, copy, paste

These events occur on cutting/copying/pasting a value.

They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is copied/pasted.

We also can use `event.preventDefault()` to abort the action.

For instance, the code below prevents all such events and shows what we are trying to cut/copy/paste:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Technically, we can copy/paste everything. For instance, we can copy a file in the OS file manager, and paste it.

There's a list of methods [in the specification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) to work with different data types, read/write to the clipboard.

But please note that clipboard is a "global" OS-level thing. Most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety. Also it is forbidden to create "custom" clipboard events in all browsers except Firefox.

## Summary

Data change events:

| Event | Description | Specials |
|---------|----------|-------------|
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives read/write access to the clipboard. |
