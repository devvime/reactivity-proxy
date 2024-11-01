import { Reactvity } from "./lib2.js";

const state = new Reactvity()

state.set({
  title: 'Bem-vindo!',
  name: 'Jon Doe',
  displayTitle: true,
  productsArray: [
    { id: 1, title: 'Produto 1', price: '$10' },
    { id: 2, title: 'Produto 2', price: '$20' },
    { id: 3, title: 'Produto 3', price: '$30' }
  ],
  clickFunction: () => {
    state.change('title', 'Título Atualizado!');
    state.change('name', 'Victor');
  },
  changeFunction(value) {
    state.change('title', value);
  }
})

state.render()

