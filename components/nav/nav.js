import './nav.scss'
import element from './nav.html'

export const Nav = {
  title: 'nav-tpl',
  init() {
    console.log('Nav element started')
  },
  render() {
    return element
  }
}