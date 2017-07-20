(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            var htmlFontSize;
            htmlFontSize = 100 * (clientWidth / 375);
          if(htmlFontSize<85) {htmlFontSize = 85}
            docEl.style.fontSize = htmlFontSize + 'px'
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
