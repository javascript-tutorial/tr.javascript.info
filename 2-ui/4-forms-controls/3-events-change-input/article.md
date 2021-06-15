# Olaylar: change, input, cut, copy, paste

<<<<<<< HEAD
Hadi veri güncellemelerine eşlik eden çeşitli olayları tartışalım.
=======
Let's cover various events that accompany data updates.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Olay: change

<<<<<<< HEAD
[change olayı](http://www.w3.org/TR/html5/forms.html#event-input-change) öğe değişmeyi bitirdiğinde tetiklenir.
=======
The `change` event triggers when the element has finished changing.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Bu olay metin girişleri için odak kaybedildiği zaman meydana gelir.

Örneğin, aşağıdaki metin alanına birşey yazarken olay yok. Ama odağı başka bir yere taşıdığımızda, örneğin, butona tıkladığımızda bir `change` olayı olacak:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

<<<<<<< HEAD
`select`, `input type=checkbox/radio` elementlerde ise olay, elementteki değişiklikten hemen sonra tetiklenir.
=======
For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Event: input

The `input` event triggers every time after a value is modified by the user.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

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

On the other hand, `input` event doesn't trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys `key:⇦` `key:⇨` while in the input.

```smart header="Can't prevent anything in `oninput`"
The `input` event occurs after the value is modified.

So we can't use `event.preventDefault()` there -- it's just too late, there would be no effect.
```

## Events: cut, copy, paste

These events occur on cutting/copying/pasting a value.

They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is copied/pasted.

We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.

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

Please note, that it's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's bit beyound our scope now, but you can find its methods [in the specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: user safety restrictions"
The clipboard is a "global" OS-level thing. So most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety, e.g. in `onclick` event handlers.

Also it's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox.
```

## Summary

Data change events:

| Event | Description | Specials |
|---------|----------|-------------|
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives read/write access to the clipboard. |
