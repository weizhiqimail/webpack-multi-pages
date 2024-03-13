// ==UserScript==
// @name         知乎回答手机端样式处理方便截图
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

  const hideAvatarSVG = `<svg width="38" height="38" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_6_blur">
   <feGaussianBlur stdDeviation="6" in="SourceGraphic"/>
  </filter>
 </defs>
 <g>
  <title>Layer 1</title>
  <g filter="url(#svg_6_blur)" id="svg_6">
   <rect stroke="#000" id="svg_1" height="38" width="38" y="0" x="0" fill="#fff"/>
   <text font-style="normal" font-weight="normal" stroke="#000" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="14" stroke-width="0" id="svg_3" y="16.23691" x="5.00004" fill="#000000">隐藏</text>
   <text font-style="normal" font-weight="normal" stroke="#000" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="14" stroke-width="0" id="svg_4" y="31.72073" x="5.00005" fill="#000000">头像</text>
  </g>
 </g>
</svg>`;

  const isMobilePhone = window.tankUtil.checkIsMobilePhone();

  window.onload = function () {
    if (checkUrlIsSingleAnswer()) {
      pageRemoveDom();
    }
  };

  window.addEventListener('scroll', () => {
    pageStart();
  });

  function checkUrlIsSingleAnswer() {
    const pathnameArr = location.pathname.split('/').filter(Boolean);
    if (pathnameArr[0] === 'question' && pathnameArr[2] === 'answer') {
      return true;
    }
    return false;
  }

  function pageRemoveDom() {
    if (isMobilePhone) {
      pageStart();

      setTimeout(() => {
        window.scrollTo(0, document.body.clientHeight);
        pageStart();
      }, 1000);
    }
  }

  function pageStart() {
    // 移除页面顶部的搜索栏
    window.tankUtil.removeDom('.MobileAppHeader');
    // 移除页面标题下的dom
    window.tankUtil.removeDom('.css-1xaekgw');
    // 移除关注问题和写回答的按钮
    window.tankUtil.removeDom('.MobileQuestionButtonGroup');
    // 移除评论内容
    window.tankUtil.removeDom('.CommentsForOia');
    // 移除查看全部
    window.tankUtil.removeDom('.ViewAll.ViewAll--bottom');
    // 移除推荐的问题
    window.tankUtil.removeDom('.KfeCollection-VipRecommendCard');
    // 移除相关阅读
    window.tankUtil.removeDom('.RelatedReadings');
    // 移除热门推荐
    window.tankUtil.removeDom('.HotQuestions');
    // 移除打开问题的链接
    window.tankUtil.removeDom('.OpenInAppButton');
    // 移除广告
    window.tankUtil.removeDom('.AdvertImg');
    window.tankUtil.removeDom('.Banner-adTag');

    // 屏蔽作者信息
    const authorContent = window.tankUtil.findDom('.AuthorInfo-content');
    if (authorContent) {
      authorContent.innerHTML = '隐藏作者';
      authorContent.style.cssText =
        'color: transparent;text-shadow: 0 0 10px rgba(0,0,0,0.5);';
    }

    const imgDomWrapper = window.tankUtil.findDom(
      '.UserLink.AuthorInfo-avatarWrapper',
    );
    if (imgDomWrapper) {
      imgDomWrapper.innerHTML = hideAvatarSVG;
    }

    // 修改点赞
    const upButton = window.tankUtil.findDom(
      '.Button.VoteButton.VoteButton--up',
    );
    if (upButton) {
      window.tankUtil.domRemoveClassName(upButton, 'is-active');
      upButton.innerHTML = upButton.innerHTML.replace(/已/gi, '');
    }

    // 打开页面内容
    const richContentInnerDom = document.querySelector(
      '.RichContent-inner.RichContent-inner--collapsed',
    );
    if (richContentInnerDom) {
      if (typeof richContentInnerDom.click === 'function') {
        richContentInnerDom.click();
        richContentInnerDom.click();
      }
    }

    // 移除页面底部点赞区域的 Sticky 按钮
    const contentItemActions = document.querySelector('.ContentItem-actions');
    if (contentItemActions) {
      window.tankUtil.domRemoveClassName(contentItemActions, 'Sticky');
    }

    // 给页面顶部的标题添加样式
    window.tankUtil.commonSetDomStyle('.QuestionHeader-title', {
      'font-weight': 'bold',
    });
  }
})();
