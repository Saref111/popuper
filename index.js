class Popuper {
    constructor() {
      this._popups = Array.from(document.querySelectorAll('.popuper'))
      this.hideAll()
      this.setListeners()
    }
    
    hideAll() {
      this._popups.forEach((it) => this.hideElement(it))
    }
    
    hideElement(element) {
      return element.style = 'display:none;'
    }
    
    showElement(element) {
      return element.style = ''
    }
    
    setListeners() {
      const elements = Array.from(document.querySelectorAll('[class^=pp]'))
      elements.forEach((it) => this.defineListener(it))
    }
    
    defineListener(element) {
      const classList = element.classList
      let ppClass = ''
      classList.forEach(it => it.startsWith('pp-') ? ppClass = it : it)
      
      if (ppClass) {
        this.setListener(ppClass, element)
      }
    }
    
    setListener(pp, element) {
      const [action, targetClass] = pp.split('>');
      let listener = null
      
      switch (true) {
        default:
          listener = (e) => {
            this.hideAll()
            this.showElement(targetClass)
          }
      }
     
      element.addEventListener('click', listener)
    }
    
    showElement(targetClass) {
      const element = this._popups.find((it) => it.classList.contains(targetClass))
      return element.style = ''
    }
  }
  
window.Popuper = Popuper
exports = {Popuper}
