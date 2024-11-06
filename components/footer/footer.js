import './footer.scss'
import element from './footer.html'

export const Footer = {
  title: 'footer-tpl',
  init() {
    console.log('Footer element started')
  },
  render() {
    return element
  }
}