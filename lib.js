export const state = new Proxy({},
  {
    set(target, property, value) {
      target[property] = value;
      render();
      return true;
    }
  });

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const render = debounce(() => {
  handleClick()
  handleChange()
  handleConditional()
  handleEach()
  handleText()
}, 1);

function handleText() {
  let items = Object.keys(state);
  items.forEach((item) => {
    let el = document.querySelectorAll('[data-' + item + ']')
    el.forEach(e => {
      if (e) {
        e.innerHTML = state[item];
      }
    })
  });
}

function handleClick() {
  document.querySelectorAll('[data-click]').forEach(element => {
    element.addEventListener('click', () => {
      try {
        const functionName = element.getAttribute('data-click');
        const fn = new Function('state', `return ${functionName}`)(state);
        if (typeof fn === 'function') fn();
      } catch (error) {
        console.error("Erro em data-click:", error);
      }
    });
  });
}

function handleChange() {
  document.querySelectorAll('[data-change]').forEach(element => {
    element.addEventListener('input', event => {
      try {
        const functionName = element.getAttribute('data-change');
        const fn = new Function('state', `return ${functionName}`)(state);
        if (typeof fn === 'function') fn(event.target.value);
      } catch (error) {
        console.error("Erro em data-change:", error);
      }
    });
  });
}

function handleConditional() {
  document.querySelectorAll('[data-if]').forEach(element => {
    try {
      const condition = new Function('state', `return ${element.getAttribute('data-if')}`);
      element.style.display = condition(state) ? '' : 'none';
    } catch (error) {
      console.error("Erro em data-if:", error);
    }
  });
}

function handleEach() {
  document.querySelectorAll('[data-for]').forEach(item => {
    const tpl = item.innerHTML
    const exprssion = item.getAttribute('data-for').split(' of ')
    const data = eval(exprssion[1])
    const output = []

    if(!data) return
    
    data.map(item => {
      const itemTpl = createElement(tpl);
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

function createElement(html) {
  const template = document.createElement("template")
  template.innerHTML = html.trim()
  return template.content.firstElementChild
}

render();