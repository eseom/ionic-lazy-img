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
.lazy-img-hide {
  opacity: 0;
  transition: opacity 0.5s linear;
}
.lazy-img-show {
  opacity: 1;
}
.lazy-img-background {
  background: #f8f8f8;
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
