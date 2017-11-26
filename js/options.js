document.addEventListener('DOMContentLoaded', () => {
  class Option {
    constructor(_option) {
      let option = {
        listen: true,
        show: true,
        type: [],
        filter: [],
        urls: []
      }
      this.option = Object.assign(option, _option);
      this.typeFlag = true;
      this.aTypeLetter = ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket', 'other'];
      this.elListens = document.querySelectorAll('input[name="listen"]');
      this.elShows = document.querySelectorAll('input[name="show"]');
      this.elTypeIcon = document.querySelector('.type-wrapper i');
      this.elATypeInput = document.querySelector('input[name="a-type-input"]');
      this.elATypeBtn = document.querySelector('.a-type-btn');
      this.elATypeText = document.querySelector('.a-type-text');
      this.elAFilterInput = document.querySelector('input[name="a-filter-input"]');
      this.elAFilterBtn = document.querySelector('.a-filter-btn');
      this.elAfilterText = document.querySelector('.a-filter-text');
      this.elAUrlsInput = document.querySelector('input[name="a-urls-input"]');
      this.elAUrlsBtn = document.querySelector('.a-urls-btn');
      this.elAUrlsText = document.querySelector('.a-urls-text');
      this.elSubmit = document.querySelector('.submit');
      this.elReset = document.querySelector('.reset');
    }
    init() {
      this.initListen();
      this.initShow();
      this.initATypeText();
      this.initAfilterText();
      this.initAUrlsText();
      this.initEvent();
    }
    initListen() {
      this.elListens.forEach((_el) => {
        _el.value == this.option.listen.toString()?_el.checked='true':_el.checked='';
      });
    }
    initShow() {
      this.elShows.forEach((_el) => {
        _el.value == this.option.show.toString()?_el.checked='true':_el.checked='';
      });
    }
    initATypeText() {
      if(this.option.type.length > 0) {
        this.elATypeText.innerHTML = '';
        this.option.type.forEach((item) => {
          this.elATypeText.innerHTML += `<span class="filter-box"><span class="filter-text">${item}</span><span class="filter-close">x</span></span>`;
        });
      }else {
        this.elATypeText.innerHTML = 'all';
      }
    }
    initAfilterText() {
      if(this.option.filter.length > 0) {
        this.elAfilterText.innerHTML = '';
        this.option.filter.forEach((item) => {
          this.elAfilterText.innerHTML += `<span class="filter-box"><span class="filter-text">${item}</span><span class="filter-close">x</span></span>`;
        });
      }else {
        this.elAfilterText.innerHTML = 'none';
      }
    }
    initAUrlsText() {
      if(this.option.urls.length > 0) {
        this.elAUrlsText.innerHTML = '';
        this.option.urls.forEach((item) => {
          this.elAUrlsText.innerHTML += `<span class="filter-box"><span class="filter-text">${item}</span><span class="filter-close">x</span></span>`;
        });
      }else {
        this.elAUrlsText.innerHTML = 'all';
      }
    }
    initEvent() {
      this.elATypeBtn.addEventListener('click', () => {
        let inputValue = this.elATypeInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.type.indexOf(inputValue) == -1) {
            this.option.type.push(inputValue);
            this.initATypeText();
          }
        }
      }, false);
      this.elATypeText.addEventListener('click', (e) => {
        if(e.target.className.indexOf('filter-close') >= 0) {
          this.option.type.splice(this.option.type.indexOf(e.target.parentNode.childNodes[0].innerHTML), 1);
          this.initATypeText();
        }
      }, false);
      this.elAFilterBtn.addEventListener('click', () => {
        let inputValue = this.elAFilterInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.filter.indexOf(inputValue) == -1) {
            this.option.filter.push(inputValue);
            this.initAfilterText();
          }
        }
      }, false);
      this.elAfilterText.addEventListener('click', (e) => {
        if(e.target.className.indexOf('filter-close') >= 0) {
          this.option.filter.splice(this.option.filter.indexOf(e.target.parentNode.childNodes[0].innerHTML), 1);
          this.initAUrlsText();
        }
      }, false);
      this.elAUrlsBtn.addEventListener('click', () => {
        let inputValue = this.elAUrlsInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.urls.indexOf(inputValue) == -1) {
            this.option.urls.push(inputValue);
            this.initAUrlsText();
          }
        }
      }, false);
      this.elAUrlsText.addEventListener('click', (e) => {
        if(e.target.className.indexOf('filter-close') >= 0) {
          this.option.urls.splice(this.option.urls.indexOf(e.target.parentNode.childNodes[0].innerHTML), 1);
          this.initAUrlsText();
        }
      }, false);
      this.elATypeInput.addEventListener('keyup', () => {
        if(this.verifyType(this.elATypeInput.value)) {
          this.elTypeIcon.className = 'icon-success';
          this.typeFlag = true;
        }else {
          this.elTypeIcon.className = 'icon-error';
          this.typeFlag = false;
        }
      });
      this.elSubmit.addEventListener('click', () => {
        if(this.typeFlag) {
          this.elListens.forEach((_el) => {
            _el.checked?this.option.listen=_el.value:'';
          });
          this.elShows.forEach((_el) => {
            _el.checked?this.option.show=_el.value:'';
          });
          chrome.storage.sync.set({imgLisOp: this.option}, () => {
            console.log('set chrome storage success');
            window.close();
          });
        }
      });
      this.elReset.addEventListener('click', () => {
        chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
          let defaultOption = {
            listen: true,
            show: true,
            type: [],
            filter: [],
            urls: []
          };
          Object.assign(this.option, defaultOption, _storage.imgLisOp);
          this.initListen();
          this.initShow();
          this.initATypeText();
          this.initAfilterText();
        });
      });
    }
    verifyType(_input) {
      return this.aTypeLetter.indexOf(_input)>=0?true:false;
    }
  }

  chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
    let oop = new Option(_storage.imgLisOp);
    oop.init();
  });
});