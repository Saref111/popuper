class Popuper {
    constructor(config) {
      if (!config) {
        this._getPopupsByDefault();
        this.hideAll();
        this.setListeners();
        console.log('Inited without config');
      } else {
        this.config = this._getConfigBtType(config);
        console.log('Inited by config', this.config);
      }
      
    }

    _getPopupsByDefault() {
      this._popups = Array.from(document.querySelectorAll('.popuper'));

      if (this._popups.length === 0) {
        console.warn('Popuper: No popups found');
      }
    }

    _getConfigBtType(arg) {
      switch (true) {
        case Array.isArray(arg) && arg.every((it) => it instanceof Object && !(it instanceof Function)):
          console.log('Array of objects');
          return arg;
          case arg instanceof Object && !Array.isArray(arg) && !(arg instanceof Function):
          console.log('Object');
          return [arg];
          default:
          console.log('Error');
          throw new Error('Popuper config should be an object or an array of objects.');
      }
    }
    
    hideAll() {
      this._popups.forEach((it) => this.hideElement(it));
    }
    
    hideElement(element) {
      return element.style = 'display:none;';
    }
    
    showElement(element) {
      return element.style = '';
    }
    
    setListeners() {
      const elements = Array.from(document.querySelectorAll('[class^=pp]'));
      elements.forEach((it) => this.defineListener(it));
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
      let [action, targetClass] = pp.split('>');
      action = action.startsWith('pp-') ? action.slice(3) : action;
      let listener = null;

      switch (true) {
        case action === 'close':
          listener = (e) => {
            this.hideElement(e.target.closest('.popuper'));
          };
          break;
        case action === 'toggle':
            listener = (e) => {
              this.hideAll();
              this.showElement(targetClass);
            };
          break;
        default:
          listener = () => {
            console.warn('Popuper: wrong action type')
          }
      }
     
      element.addEventListener('click', listener);
    }
    
    showElement(targetClass) {
      const element = this._popups.find((it) => it.classList.contains(targetClass));
      return element.style = '';
    }
  }
  
window.Popuper = Popuper;
exports = {Popuper};
