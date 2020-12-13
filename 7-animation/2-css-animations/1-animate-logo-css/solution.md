
`width` ve `height` özelliklerinin animasyonu için CSS:
```css
/* orijinal class */

#flyjet {
  transition: all 3s;
}

/* JS .growing ekliyor*/
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Dikkat et! `transitionend` iki kere tetikleniyor -- her özellik için bir kere. Eğer bir konrol yapmazsak mesaj 2 kere gözükecek.
