ionic-lazy-img
=====================


## Demo
preparing

## Quick Start

```sh
bower install ionic-lazy-img --save

or

npm install ionic-lazy-img --save
```

```html
<script src="path/to/ionic-lazy-img.js"></script>
```

```css
.image-hide {
  opacity: 0;
  transition: opacity 0.5s linear;
}
.image-show {
  opacity: 1;
}
```

```javascript
angular.module('starter',
              ['ionic', 'ionicLazyImg'])
```

``` html
<ion-content lazy-img-container>
.
.
.
 <img lazy-img ratio="1" top-distance="700" bottom-distance="200" src="/path/to/image" ...>
.
.
.
</ion-content>
```
