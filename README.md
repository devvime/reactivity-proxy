# ReactiveProxy JS

Reactivity with Proxy and Custom Attributes

## Install

```bash
npm install reactive-proxy
```

## Usage

```js
import { ReactiveProxy } from "./src/ReactiveProxy.js";

const state = new ReactiveProxy()

state.set({
  title: 'Hello World!',
  name: 'Jon Doe',
  displayTitle: true,
  productsArray: [
    { id: 1, title: 'Product 1', price: '$10', data: { color: 'green' } },
    { id: 2, title: 'Product 2', price: '$20', data: { color: 'blue' } },
    { id: 3, title: 'Product 3', price: '$30', data: { color: 'black' } }
  ],
  users: [
    { id: 1, name: 'Steve', email: 's@s.com' },
    { id: 2, name: 'Other Steve', email: 'o@s.com' }
  ],
  car: {
    brand: 'VW',
    model: 'Gol',
    year: 2010,
    engine: 'AP 1.8',
    color: 'blue',
    transmission: 'manual',
    doors: 4,
    price: 10000,
    image: 'https://s3.amazonaws.com/car-images-bucket/vw/gol/gol-1.jpg',
    buyer: {
      name: 'Jon',
      phone: '55 11 99999-9999'
    }
  },
  clickFunction() {
    state.change('title', 'Título Atualizado!');
    state.change('name', 'Victor');
    state.push('productsArray', { id: 4, title: 'Product 3', price: '$30', data: { color: 'pink' } })
  },
  changeFunction(value) {
    state.change('title', value);
  }
})

state.resolve()
```

## HTML Attributes

Page result considering the initial configuration defined in the state

Display state value

```html
<p data-title></p>
<p data-name></p>
```

Page result

```html
<p>Hello World!</p>
<p>Jon Doe</p>
```

```html
<div data-car>
    <p>Vehicle:</p>
    <p>Brand: <span data-car-brand></span></p>
    <p>Model: <span data-car-model></span></p>
    <p>Year: <span data-car-year></span></p>
    <p>Engine: <span data-car-engine></span></p>
    <p>Color: <span data-car-color></span></p>
    <p>Transmission: <span data-car-transmission></span></p>
    <p>Doors: <span data-car-doors></span></p>
    <p>Price: <span data-car-price></span></p>
    <img data-car-image src="" width="300px">
    <p>Name: <span data-car-buyer-name></span></p>
    <p>Phone: <span data-car-buyer-phone></span></p>
</div>
```

Page result

```html
<div>
    <p>Vehicle:</p>
    <p>Brand: <span>VW</span></p>
    <p>Model: <span>Gol</span></p>
    <p>Year: <span>2010</span></p>
    <p>Engine: <span>AP 1.8</span></p>
    <p>Color: <span>blue</span></p>
    <p>Transmission: <span>manual</span></p>
    <p>Doors: <span>4</span></p>
    <p>Price: <span>10000</span></p>
    <img src="https://s3.amazonaws.com/car-images-bucket/vw/gol/gol-1.jpg" width="300px">
    <p>Name: <span>Jon</span></p>
    <p>Phone: <span>55 11 99999-9999</span></p>
</div>
```

Conditionais

```html
<p data-if="state.displayTitle" data-title></p>
<p data-if="state.name === 'Jon Doe'" data-name></p>
<p data-if="state.name === 'Victor'">Hello <span data-name></span></p>
```

Page result

```html
<p>Hello World!</p>
<p>Hello Jon Doe</p>
```

Click event

```html
<button data-click="state.clickFunction()">click here</button>
```

Change event

```html
<input type="text" data-change="state.changeFunction" placeholder="Type something..."/>
```

Loop event

```html
<div data-for="product of state.productsArray">
    <p>
        <span data-product-id></span> <span data-product-title></span> <span data-product-price></span> 
        Color: <span data-product-data-color></span>
    </p>
</div>  
```

Page result

```html
<div>
    <p><span>1</span> <span>Product 1</span> <span>$10</span> Color: <span>green</span></p>
    <p><span>2</span> <span>Product 2</span> <span>$20</span> Color: <span>blue</span></p>
    <p><span>3</span> <span>Product 3</span> <span>$30</span> Color: <span>black</span></p>
</div> 
```
