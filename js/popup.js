document.addEventListener('DOMContentLoaded', () => {
  class Option {
    constructor(_option) {
      let option = {
        listen: true,
        show: true,
        rule: '#type#image',
        filter: []
      }
      this.option = Object.assign(option, _option);
      this.ruleFlag = true;
      this.aRuleLetter = ['type', 'string', 'reg', 'format'];
      this.elListens = document.querySelectorAll('input[name="listen"]');
      this.elShows = document.querySelectorAll('input[name="show"]');
      this.elRule = document.querySelector('input[name="rule"]');
      this.elAFilterInput = document.querySelector('input[name="a-filter-input"]');
      this.elAFilterBtn = document.querySelector('.a-filter-btn');
      this.elAfilterText = document.querySelector('.a-filter-text');
      this.elSubmit = document.querySelector('.submit');
      this.elRuleIcon = document.querySelector('.rule-wrapper i');
    }
    init() {
      this.initListen();
      this.initShow();
      this.initRule();
      this.initAfilterText();
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
    initRule() {
      this.elRule.value = this.option.rule;
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
    initEvent() {
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
          this.initAfilterText();
        }
      }, false);
      this.elRule.addEventListener('keyup', () => {
        if(this.verifyRule(this.elRule.value)) {
          this.elRuleIcon.className = 'icon-success';
          this.ruleFlag = true;
        }else {
          this.elRuleIcon.className = 'icon-error';
          this.ruleFlag = false;
        }
      });
      this.elSubmit.addEventListener('click', () => {
        if(this.ruleFlag) {
          this.elListens.forEach((_el) => {
            _el.checked?this.option.listen=_el.value:'';
          });
          this.elShows.forEach((_el) => {
            _el.checked?this.option.show=_el.value:'';
          });
          this.option.rule = this.elRule.value;
          this.sendMessageToContentScript({sessionStorage: this.option}, (response) => {
            console.log('set page config success');
          });
        }
      });
    }
    verifyRule(_input) {
      let reg = new RegExp('#(' + this.aRuleLetter.join('|') + ')#');
      return reg.test(_input) && _input.replace(reg, '').replace(/\s*/g, '');
    }
    sendMessageToContentScript(message, callback) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          if(callback) callback(response);
        });
      });
    }
  }

  chrome.storage.sync.get({imgLisOp: {}}, (_storage) => {
    let oop = new Option(_storage.imgLisOp);
    oop.sendMessageToContentScript({getSessionStorage: true}, (response) => {
      Object.assign(oop.option, response);
      oop.init();
    });
  });
});