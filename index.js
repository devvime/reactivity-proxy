import { state } from './lib/ReactivityProxy.js';

import { Nav } from './components/nav/nav.js';
import { Footer } from './components/footer/footer.js';

state.registerElements([
  ['nav-tpl', Nav],
  ['footer-tpl', Footer]
])

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
      name: 'Victor',
      phone: '55 11 99999-9999'
    }
  },
  clickFunction() {
    state.change('title', 'Success!');
    state.change('name', 'Victor');
    state.push('productsArray', { id: 4, title: 'Product 3', price: '$30', data: { color: 'pink' } })
  },
  changeFunction(value) {
    state.change('title', value);
  }
})

state.resolve()

