// ==UserScript==
// @name         知乎回答内容转成图片
// @namespace    http://overflow.cat/
// @version      0.1.1
// @description  知乎回答内容转成图片
// @author       OverflowCat
// @match        https://www.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /**
   * bae64转为图片
   * @param urlData
   * @return {Blob}
   */
  function base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    // 去掉url的头，并转化为byte
    var bytes = window.atob(arr[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);

    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
      type: mime,
    });
  }

  // 创建截图
  function takeScreenshot(fileName, shotDom) {
    domtoimage
      .toBlob(shotDom)
      .then(function (blob) {
        const aLink = document.createElement('a');
        const evt = new Event('click');
        aLink.download = fileName + '.png';
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        URL.revokeObjectURL(blob);
      })
      .catch((err) => {
        console.log('shot error', err);
      });
    // domtoimage.toPng(shotDom)
    //   .then((base64DataUrl) => {
    //     const aLink = document.createElement('a');
    //     const blob = new Blob([base64ToBlob(base64DataUrl)], {
    //       type: 'text/plain'
    //     });
    //     const evt = new Event('click');
    //     aLink.download = fileName + '.png';
    //     aLink.href = URL.createObjectURL(blob);
    //     aLink.click();
    //     URL.revokeObjectURL(blob);
    //   })
    //   .catch((error) => {
    //     console.error('oops, something went wrong!', error);
    //   });
  }

  // 下载文件
  function loadFile(fileName, content) {
    var aLink = document.createElement('a');
    var blob = new Blob([content], {
      type: 'text/plain',
    });
    var evt = new Event('click');
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    URL.revokeObjectURL(blob);
  }

  // 首页的回答列表
  function homePageAnswerAddShotBtn() {
    const answerList = document.querySelectorAll(
      '#TopstoryContent .TopstoryItem',
    );
    if (answerList.length > 0) {
      for (let i = 0; i < answerList.length; i++) {
        const answerItemDom = answerList[i];
        const answerTitleDom =
          answerItemDom.querySelector('.ContentItem-title');
        if (answerTitleDom) {
          const questionTitle = answerTitleDom.querySelector('a');
          const shotButtonDom = createShotButton(
            questionTitle.innerText,
            answerItemDom,
          );
          answerTitleDom.appendChild(shotButtonDom);
        }
      }
    }
  }

  function createShotButton(questionTitle, answerItemDom) {
    const shotButtonDom = window.tankUtil.createElement(
      'button',
      {
        innerText: '回答截图',
      },
      {
        padding: '2px 4px',
        margin: '0px 4px',
        border: 'none',
        color: '#FFF',
        background: '#F70',
        'font-size': '14px',
        'border-radius': '4px',
      },
    );
    shotButtonDom.addEventListener('click', () => {
      takeScreenshot(questionTitle, answerItemDom);
    });
    return shotButtonDom;
  }

  window.onload = function () {
    homePageAnswerAddShotBtn();
  };
})();
