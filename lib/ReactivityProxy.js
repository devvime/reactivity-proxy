export class ReactivityProxy {

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

  handleText() {
    const setElementTextOrSrc = (itemPath, value) => {
      let elements = document.querySelectorAll(`[data-${itemPath.join('-')}]`);
      elements.forEach(el => {
        if (el.hasAttribute('src')) {
          el.setAttribute('src', value);
        } else if (el.hasAttribute('href')) {
          el.setAttribute('href', value);
        }else {
          el.innerText = value;
        }
      });
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
      const output = [];
      const tpl = item.innerHTML;
      const expression = item.getAttribute('data-for').split(' of ');
      const data = eval('this.' + expression[1]);
  
      if (!data) return;
  
      data.map(itemData => {
        const itemTpl = this.createElement(tpl);
        itemTpl.removeAttribute('data-for');
  
        const processObject = (obj, path = []) => {
          Object.keys(obj).forEach(key => {
            const newPath = [...path, key];
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              processObject(obj[key], newPath);
            } else {
              const selector = `[data-${expression[0]}-${newPath.join('-')}]`;
              itemTpl.querySelectorAll(selector).forEach(e => {
                if (e.hasAttribute('src')) {
                  e.setAttribute('src', obj[key]);
                } else if (e.hasAttribute('href')) {
                  e.setAttribute('href', obj[key]);
                } else {
                  e.innerText = obj[key];
                }
              });
            }
          });
        };
  
        processObject(itemData);
        output.push(itemTpl);
      });
  
      item.innerHTML = '';
      output.forEach(el => item.appendChild(el));
    });
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