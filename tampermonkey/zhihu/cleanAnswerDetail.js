// ==UserScript==
// @name         知乎单个答案删除其他内容
// @namespace    http://overflow.cat/
// @version      0.1.2
// @description  知乎单个答案删除其他内容
// @author       OverflowCat
// @match        https://www.zhihu.com/*
// @require      http://file.ikite.top/cdn/html2canvas.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  window.onload = function () {
    pageStart();
  };

  function pageStart() {
    if (!checkUrlIsSingleAnswer()) {
      return;
    }

    const buttonStyle = {
      height: '24px',
      padding: '2px 4px',
      margin: '0px 4px',
      border: 'none',
      color: '#FFF',
      background: '#F70',
      'font-size': '12px',
      'border-radius': '4px',
      cursor: 'pointer',
    };

    const createShotImgButton = window.tankUtil.createElement(
      'button',
      {
        innerText: '截图',
      },
      buttonStyle,
    );

    createShotImgButton.addEventListener('click', () => {
      pageRemoveDom(true);
    });

    const removeDomButton = window.tankUtil.createElement(
      'button',
      {
        innerText: '移除多余内容',
      },
      buttonStyle,
    );

    removeDomButton.addEventListener('click', () => {
      pageRemoveDom(false);
    });

    const imgList = Array.from(document.querySelectorAll('img'));
    imgList.forEach((imgItem) => {
      const src = imgItem.getAttribute('src');
      console.log('src', src);
      if (src) {
        const urlObj = new URL(src);
        imgItem.setAttribute('crossorigin', urlObj.origin);
      }
    });

    const pageHeaderTagsDom = document.querySelector('.QuestionHeader-tags');
    if (pageHeaderTagsDom) {
      window.tankUtil.commonSetDomStyle(pageHeaderTagsDom, {
        'align-items': 'center',
      });
      window.tankUtil.domAddClassName(
        createShotImgButton,
        'custom-remove-not-answer-content',
      );
      window.tankUtil.domAddClassName(
        removeDomButton,
        'custom-remove-not-answer-content',
      );
      pageHeaderTagsDom.appendChild(createShotImgButton);
      pageHeaderTagsDom.appendChild(removeDomButton);
    }
  }

  function checkUrlIsSingleAnswer() {
    const pathnameArr = location.pathname.split('/').filter(Boolean);
    if (pathnameArr[0] === 'question' && pathnameArr[2] === 'answer') {
      return true;
    }
    return false;
  }

  function pageRemoveDom(transformToImg = true) {
    const isMobilePhone = window.tankUtil.checkIsMobilePhone();

    if (isMobilePhone) {
      const richContentInnerDom = document.querySelector(
        '.RichContent-inner.RichContent-inner--collapsed',
      );
      if (richContentInnerDom) {
        if (typeof richContentInnerDom.click === 'function') {
          richContentInnerDom.click();
          richContentInnerDom.click();
        }
      }

      const contentItemActions = document.querySelector('.ContentItem-actions');
      if (contentItemActions) {
        window.tankUtil.domRemoveClassName(contentItemActions, 'Sticky');
      }

      window.tankUtil.removeDom(
        '.Button.ContentItem-rightButton.ContentItem-expandButton',
      );
      window.tankUtil.removeDom('.MobileAppHeader');
      window.tankUtil.removeDom('.css-1xaekgw');
      window.tankUtil.removeDom('.MobileQuestionButtonGroup');
      window.tankUtil.removeDom('.List-header');
      window.tankUtil.removeDom('.CommentsForOia');
      window.tankUtil.removeDom('.KfeCollection-VipRecommendCard');
      window.tankUtil.removeDom('.Card .Card-header');
      window.tankUtil.removeDom('.Card .List');
      window.tankUtil.removeDom('.Card.ViewAll.ViewAll--bottom');
      window.tankUtil.removeDom('.Card.RelatedReadings');
      window.tankUtil.removeDom('.OpenInAppButton');
      window.tankUtil.removeDom('.Card.HotQuestions');
      window.tankUtil.removeDom('.custom-remove-not-answer-content');

      window.tankUtil.commonSetDomStyle(
        document.querySelector('.QuestionHeader-title'),
        {
          'font-weight': 'bold',
        },
      );

      window.tankUtil.commonSetDomStyle(
        document.querySelector('.QuestionHeader-title'),
        {
          'font-weight': 'bold',
        },
      );

      const appMainDom = document.querySelector('.App-main');
      const appMainInnerWrapper = window.tankUtil.createElement('div');

      const questionHeaderDom = document
        .querySelector('.QuestionHeader')
        .cloneNode(true);
      const questionLineBlockDom = window.tankUtil.createElement('div');
      window.tankUtil.commonSetDomStyle(questionLineBlockDom, {
        width: '100%',
        height: '20px',
        background: '#F6F6F6',
      });
      const questionAnswerContentDom = document
        .querySelector('.QuestionAnswer-content')
        .cloneNode(true);
      window.tankUtil.commonSetDomStyle(questionAnswerContentDom, {
        'padding-bottom': '60px',
        background: '#FFF',
      });

      appMainInnerWrapper.appendChild(questionHeaderDom);
      appMainInnerWrapper.appendChild(questionLineBlockDom);
      appMainInnerWrapper.appendChild(questionAnswerContentDom);
      appMainDom.innerHTML = '';
      appMainDom.appendChild(appMainInnerWrapper);

      if (transformToImg) {
        html2canvas(appMainDom, {
          useCORS: true,
          scrollY: 0,
          scrollX: 0,
          allowTaint: true,
          logging: true,
        }).then(function (canvas) {
          appMainDom.innerHTML = '';
          appMainDom.appendChild(canvas);
        });
      }
    } else {
      window.tankUtil.removeDom('.Card.ViewAll');
      window.tankUtil.removeDom('.Card.MoreAnswers');
      window.tankUtil.removeDom('.QuestionHeader-side');
      window.tankUtil.removeDom('.AppHeader');
      window.tankUtil.removeDom('#CTZ_OPEN_BUTTON');
      window.tankUtil.removeDom('#AnswerFormPortalContainer');
      window.tankUtil.removeDom('.custom-remove-not-answer-content');

      const appMainDom = document.querySelector('.App-main');
      window.tankUtil.commonSetDomStyle(appMainDom, {
        padding: '20px',
        width: '1000px',
        'min-width': '1000px',
        margin: '0 auto',
      });

      const appMainInnerWrapper = window.tankUtil.createElement('div');

      const questionHeaderDom = document
        .querySelector('.QuestionHeader')
        .cloneNode(true);
      window.tankUtil.commonSetDomStyle(questionHeaderDom, {
        margin: '0 auto',
        width: '1000px',
        'min-width': '1000px',
        'border-bottom': '20px solid #F6F6F6',
      });

      const questionAnswerContentDom = document
        .querySelector('.QuestionAnswer-content')
        .cloneNode(true);
      window.tankUtil.commonSetDomStyle(questionAnswerContentDom, {
        padding: '20px',
        background: '#FFF',
      });

      appMainInnerWrapper.appendChild(questionHeaderDom);
      appMainInnerWrapper.appendChild(questionAnswerContentDom);
      appMainDom.innerHTML = '';
      appMainDom.appendChild(appMainInnerWrapper);

      if (transformToImg) {
        html2canvas(appMainDom).then(function (canvas) {
          console.log('document.body canvas', canvas);
          appMainDom.innerHTML = '';
          appMainDom.appendChild(canvas);
        });
      }
    }
  }
})();
