# ReactiveProxy JS

Reactivity with Proxy and Custom Attributes

## Install

```bash
npm i reactivity-proxy
```

## Usage

```js
import { state } from 'reactivity-proxy'

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
    state.change('title', value)
  }
});

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

### Include elements

```
├── components
|  ├── nav
|  |  └── nav.html
|  |  └── nav.scss
|  |  └── nav.js
|  |── footer
|  |  └── footer.html
|  |  └── footer.scss
|  |  └── footer.js
```

Structure required for all elements

nav.js
```js
import './nav.scss' // import style
import element from './nav.html' // import html

export const Nav = {
  title: 'nav-tpl', // htm tag name
  init() {
    console.log('Nav element started')
  },
  render() {
    return element // return html
  }
}
```

### Register all elements

```js
import { Nav } from './components/nav/nav.js';
import { Footer } from './components/footer/footer.js';

state.registerElements([
  ['nav-tpl', Nav],
  ['footer-tpl', Footer]
])
```

To include elements on the page, add an html tag with the element name.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reactivity Proxy</title>
    <link rel="stylesheet" href="dist/css/main.css">
</head>
<body>

    <!-- include nav element -->
    <nav-tpl></nav-tpl>

    <section></section>

    <!-- include footer element -->
    <footer-tpl></footer-tpl>

    <script src="dist/js/main.js" type="module"></script>
</body>
</html>
```

### Webpack config

webpack.config.js
```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js',
  devtool: "source-map",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['minify']
            ]
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        use: ["html-loader"],
        test: /\.html$/i,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/main.css'
    })
  ]
};
```

### Dependencies

package.json

```json
{
  "dependencies": {
    "css-loader": "^7.1.2",
    "sass": "^1.79.4",
    "sass-loader": "^16.0.2",
    "style-loader": "^4.0.0",
    "file-loader": "^6.2.0",
    "html-loader": "^3.1.0",
    "html-webpack-plugin": "^5.5.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.4",
    "babel-loader": "^9.2.1",
    "babel-preset-minify": "^0.5.2",
    "mini-css-extract-plugin": "^2.9.1",
    "webpack": "^5.95.0",
    "webpack-cli": "^5.1.4"
  }
}
```