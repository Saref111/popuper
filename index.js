class Popup {
  constructor(config) {
    this.elem = config.element 
    this.handlers = config.handlers
  }
  
  setHandlers() {
    this.handlers.forEach((it) => {
      const ui = this.elem.querySelector(it.selector)
      
      if (ui) {
        for (let key in it) {
          if (key.endsWith('-cb')) { // no -cb
            ui.addEventListener(key.slice(0, key.length - 3), it[key])
          }     
        }
      }
    })  
  }
}

const p = new Popup({
  element: document.querySelector('.qqq'),
  handlers: [{'click-cb': () => console.log(121212),
              'contextmenu-cb': (e) => e.preventDefault(),
               selector: 'button'
             }]
})

p.setHandlers()
