/**
 * moji 移动端文章页面，去掉一些不必要的元素，然后打印为 PDF，方便阅读
 * 注意：这个脚本只能在移动端的页面上使用，因为是针对移动端的页面进行的处理
 * 如果要是在 PC 端使用，则需要重新写代码
 * 更新时间：2024-03-09
 */

function removeDom(className) {
    try {
        const childDoms = document.querySelectorAll(className.trim());
        for (let i = 0; i < childDoms.length; i++) {
        const childDom = childDoms[i];
        childDom.parentNode.removeChild(childDom);
        }
    } catch (e) {
        console.log('e', e);
    }
}

// 手机分享的页面
removeDom('.download-tips');
removeDom('.cover-container');
removeDom('.moji-widget.moji-article-source-item');
removeDom('.moji-article-context-link.doubleLink');
removeDom('.img-audio');
removeDom('.author-container');
removeDom('.article-footer');
removeDom('.components-container');
removeDom('.recommand-column-container');
removeDom('.suspend-player.user-select-none');
removeDom('.openInApp');
removeDom('.ql-align-center');
