document.addEventListener('DOMContentLoaded', () => {
  class Option {
    constructor(_option) {
      let option = {
        listen: true,
        show: true,
        hosts: [],
        filter: [],
        urls: []
      }
      this.option = Object.assign(option, _option);
      this.typeFlag = true;
      this.elListens = document.querySelectorAll('input[name="listen"]');
      this.elShows = document.querySelectorAll('input[name="show"]');
      this.elAHostsInput = document.querySelector('input[name="a-hosts-input"]');
      this.elAHostsBtn = document.querySelector('.a-hosts-btn');
      this.elAHostsText = document.querySelector('.a-hosts-text');
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
      this.initAHostsText();
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
    initAHostsText() {
      if(this.option.hosts.length > 0) {
        this.elAHostsText.innerHTML = '';
        this.option.hosts.forEach((item) => {
          this.elAHostsText.innerHTML += `<span class="filter-box"><span class="filter-text">${item}</span><span class="filter-close">x</span></span>`;
        });
      }else {
        this.elAHostsText.innerHTML = 'all';
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
      this.elAHostsBtn.addEventListener('click', () => {
        let inputValue = this.elAHostsInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.hosts.indexOf(inputValue) == -1) {
            this.option.hosts.push(inputValue);
            this.elAHostsInput.value = '';
            this.initAHostsText();
          }
        }
      }, false);
      this.elAHostsText.addEventListener('click', (e) => {
        if(e.target.className.indexOf('filter-close') >= 0) {
          this.option.hosts.splice(this.option.hosts.indexOf(e.target.parentNode.childNodes[0].innerHTML), 1);
          this.initAHostsText();
        }
      }, false);
      this.elAFilterBtn.addEventListener('click', () => {
        let inputValue = this.elAFilterInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.filter.indexOf(inputValue) == -1) {
            this.option.filter.push(inputValue);
            this.elAFilterInput.value = '';
            this.initAfilterText();
          }
        }
      }, false);
      this.elAfilterText.addEventListener('click', (e) => {
        if(e.target.className.indexOf('filter-close') >= 0) {
          this.option.filter.splice(this.option.filter.indexOf(e.target.parentNode.childNodes[0].innerHTML), 1);
          this.initAfilterText();
        }
      }, false);
      this.elAUrlsBtn.addEventListener('click', () => {
        let inputValue = this.elAUrlsInput.value.replace(/\s*/g, '');
        if(inputValue) {
          if(this.option.urls.indexOf(inputValue) == -1) {
            this.option.urls.push(inputValue);
            this.elAUrlsInput.value = '';
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
            hosts: [],
            filter: [],
            urls: []
          };
          Object.assign(this.option, defaultOption, _storage.imgLisOp);
          this.initListen();
          this.initShow();
          this.initAHostsText();
          this.initAfilterText();
        });
      });
    }
  }

  chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
    let oop = new Option(_storage.imgLisOp);
    oop.init();
  });
});