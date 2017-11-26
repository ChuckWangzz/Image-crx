document.addEventListener('DOMContentLoaded', () => {
  //元素插入
  class ElImLisBox {
    constructor(_option) {
      let option = {
        show: true,
        flag: true
      };
      this.state = false;
      this.option = Object.assign(option, _option);
      this.successIcon = '<svg class="img-listener-icon" viewbox="0 0 1024 1024"><path class="path" d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m292.266667-697.130667a42.666667 42.666667 0 0 0-60.330667 0L421.12 649.685333l-153.92-153.898666a43.242667 43.242667 0 1 0-60.330667 60.330666l179.370667 179.370667a46.933333 46.933333 0 0 0 65.749333 5.418667 35.285333 35.285333 0 0 0 5.290667-6.72L804.266667 387.2a42.666667 42.666667 0 0 0 0-60.330667z" p-id="8165" fill="#3bac27"></path></svg>';
      this.warnIcon = '<svg class="img-listener-icon" viewbox="0 0 1024 1024"><path d="M512 1024C229.23264 1024 0 794.76736 0 512S229.23264 0 512 0s512 229.23264 512 512-229.23264 512-512 512z m0-233.73824c30.73536 0 55.6544-24.91904 55.6544-55.6544 0-30.73536-24.91904-55.6544-55.6544-55.6544-30.73536 0-55.6544 24.91904-55.6544 55.6544 0 30.73536 24.91904 55.6544 55.6544 55.6544z m-55.05024-546.304l21.05856 357.99552c0.3328 5.64224 5.20704 10.21952 10.89024 10.21952h46.20288c5.69856 0 10.55744-4.57216 10.89024-10.21952l21.05856-357.9904a9.55392 9.55392 0 0 0-9.67168-10.22464H466.62144a9.53856 9.53856 0 0 0-9.6768 10.21952z" fill="#F43530" p-id="6153"></path></svg>';
      this.elImLisBox = document.createElement('div');
      this.elSvgWrap = document.createElement('div');
      this.elUlWrap = document.createElement('ul');
    }
    init() {
      this.elImLisBox.className = 'img-listener-box';
      this.elSvgWrap.className = 'svg-wrap'
      this.elUlWrap.className = 'img-listener-content';
      this.elImLisBox.appendChild(this.elUlWrap);
      this.elImLisBox.appendChild(this.elSvgWrap);
      this.initIcon();
      this.initDisplay();
      document.body.appendChild(this.elImLisBox);
      this.initEvent();
    }
    initDisplay() {
      if (this.option.show) {
        this.elImLisBox.style.display = 'block';
      } else {
        this.elImLisBox.style.display = 'none';
      }
    }
    initIcon() {
      if (this.option.flag) {
        this.elSvgWrap.innerHTML = this.successIcon;
      } else {
        this.elSvgWrap.innerHTML = this.warnIcon;
      }
    }
    initEvent() {
      this.elSvgWrap.addEventListener('click', () => {
        if (this.state) {
          this.elImLisBox.className = 'img-listener-box';
          this.state = false;
        } else {
          this.elImLisBox.className = 'img-listener-box show';
          this.state = true;
        }
      });
    }
    addItem(_liop) {
      let elLi = document.createElement('li');
      elLi.innerHTML = `<a href="${_liop.url}" target="_blank">
                          <img src="${_liop.url}" />
                          <div class="text-wrap">
                            ${_liop.url}
                          </div>
                        </a>`;
      this.elUlWrap.appendChild(elLi);
    }
  }
  elImLisBox = new ElImLisBox();
  elImLisBox.init();
  let num = 0;
  //接受background&popup传递过来的信息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.from === 'background') {
          console.log(num++);
          elImLisBox.addItem(request.details);
      }
    sendResponse('content-scirpt get message success');
  });
});