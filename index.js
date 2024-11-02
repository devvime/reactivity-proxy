import { ReactiveProxy } from "./src/ReactiveProxy.js";

const state = new ReactiveProxy()

state.set({
  title: 'Hello World!',
  name: 'Jon Doe',
  displayTitle: true,
  productsArray: [
    { id: 1, title: 'Product 1', price: '$10' },
    { id: 2, title: 'Product 2', price: '$20' },
    { id: 3, title: 'Product 3', price: '$30' }
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
    state.push('productsArray', { id: 3, title: 'Product 3', price: '$30' })
  },
  changeFunction(value) {
    state.change('title', value);
  }
})

state.resolve()

