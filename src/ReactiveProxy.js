export class ReactiveProxy {

  constructor() {
    this.state = new Proxy(
      {},
      {
        set:(target, property, value) => {
          target[property] = value;
          this.resolve()
          return true;
        }
      }
    );
    this.handleClick()
    this.handleChange()
  }

  // handleText() {
  //   let items = Object.keys(this.state);
  //   items.forEach((item) => {
  //     let el = document.querySelectorAll('[data-' + item + ']')
  //     el.forEach(e => {
  //       if (e) {
  //         if (typeof this.state[item] === 'object' && this.state[item] !== null) {
  //           const values = Object.keys(this.state[item]);
  //           values.forEach(value => {
  //             let elObj = document.querySelector(`[data-${item}-${value}]`)
  //             if (elObj) {
  //               if (elObj.hasAttribute('src')) {
  //                 elObj.setAttribute('src', this.state[item][value]);
  //               } else {
  //                 elObj.innerText = this.state[item][value];
  //               }
  //             }
  //           })            
  //         } else {
  //           e.innerText = this.state[item];
  //         }
  //       }
  //     })
  //   });
  // }

  handleText() {
    const setElementTextOrSrc = (itemPath, value) => {
      let el = document.querySelector(`[data-${itemPath.join('-')}]`);
      if (el) {
        if (el.hasAttribute('src')) {
          el.setAttribute('src', value);
        } else {
          el.innerText = value;
        }
      }
    };
  
    const processObject = (obj, path = []) => {
      Object.keys(obj).forEach(key => {
        const newPath = [...path, key];
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObject(obj[key], newPath); // chamada recursiva para objetos aninhados
        } else {
          setElementTextOrSrc(newPath, obj[key]);
        }
      });
    };
  
    processObject(this.state);
  }
  

  handleClick() {
    document.querySelectorAll('[data-click]').forEach(element => {
      element.addEventListener('click', () => {
        try {
          const functionName = element.getAttribute('data-click');
          const fn = new Function('state', `return ${functionName}`)(this.state);
          if (typeof fn === 'function') fn();
        } catch (error) {
          console.error("Erro em data-click:", error);
        }
      });
    });
  }

  handleChange() {
    document.querySelectorAll('[data-change]').forEach(element => {
      element.addEventListener('input', event => {
        try {
          const functionName = element.getAttribute('data-change');
          const fn = new Function('state', `return ${functionName}`)(this.state);
          if (typeof fn === 'function') fn(event.target.value);
        } catch (error) {
          console.error("Erro em data-change:", error);
        }
      });
    });
  }

  handleConditional() {
    document.querySelectorAll('[data-if]').forEach(element => {
      try {
        const condition = new Function('state', `return ${element.getAttribute('data-if')}`);
        element.style.display = condition(this.state) ? '' : 'none';
      } catch (error) {
        console.error("Erro em data-if:", error);
      }
    });
  }

  handleEach() {
    document.querySelectorAll('[data-for]').forEach(item => {
      const output = []
      const tpl = item.innerHTML
      const exprssion = item.getAttribute('data-for').split(' of ')
      const data = eval('this.' + exprssion[1])
  
      if(!data) return
      
      data.map(item => {
        const itemTpl = this.createElement(tpl);
        itemTpl.removeAttribute('[data-for]')
  
        Object.keys(item).map(key => {
          itemTpl.querySelectorAll(`[data-${exprssion[0]}-${key}]`).forEach(e => {
            if (e.hasAttribute('src')) {
              e.setAttribute('src', item[key])
            } else {
              e.innerText = item[key]
            }
          })
        })
  
        output.push(itemTpl)
      })
  
      item.innerHTML = ''
      output.forEach(el => {
        item.appendChild(el)
      })
    })
  }

  createElement(html) {
    const template = document.createElement("template")
    template.innerHTML = html.trim()
    return template.content.firstElementChild
  }

  set(value) {
    this.state = value
    this.resolve()
  }

  change(name, value) {
    this.state[name] = value
    this.resolve()
  }

  push(name, value) {
    this.state[name].push(value)
    this.resolve()
  }

  get() {
    return this.state
  }

  resolve() {
    this.handleText()
    this.handleConditional()
    this.handleEach()
  }

}