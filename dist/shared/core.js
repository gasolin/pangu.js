"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cjk = "\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF";
var a = 'A-Za-z';
var n = '0-9';
var anyCjk = new RegExp("[".concat(cjk, "]"));
var convertToFullwidthCjkSpaceSymbolsSpaceCjk = new RegExp("([".concat(cjk, "])[ ]*([~\\!;\\:,\\.\\?]+)[ ]*([").concat(cjk, "])"), 'g');
var convertToFullwidthCjkSymbolsAn = new RegExp("([".concat(cjk, "])([~\\!;\\?]+)([A-Za-z0-9])"), 'g');
var fixCjkColonAns = new RegExp("([".concat(cjk, "])\\:([A-Z0-9\\(\\)])"), 'g');
var cjkQuote = new RegExp("([".concat(cjk, "])([`'\"\u05F4])"), 'g');
var quoteCJK = new RegExp("([`'\"\u05F4])([".concat(cjk, "])"), 'g');
var fixQuote = /([`'"\u05f4]+)(\s*)(.+?)(\s*)([`'"\u05f4]+)/g;
var possessiveSingleQuote = new RegExp("([".concat(cjk, "A-Za-z0-0])( )'s"), 'g');
var hashAnsCjkHash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
var cjkHash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g;
var hashCJK = /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
var cjkOperatorAns = new RegExp("([".concat(cjk, "])([\\+\\-\\*\\/=&\\|<>])([A-Za-z0-9])"), 'g');
var ansOperatorCjk = new RegExp("([A-Za-z0-9])([\\+\\-\\*\\/=&\\|<>])([".concat(cjk, "])"), 'g');
var fixSlashSpaceAns = new RegExp('([\\/])( )([a-z0-9\\-_\\.\\/]+)', 'g');
var fixAnsSlashSpace = new RegExp('([\\/\\.])([A-Za-z0-9\\-_\\.\\/]+)( )([\\/])', 'g');
var cjkLeftBracket = new RegExp("([".concat(cjk, "])([\\(\\[\\{<>\u201C])"), 'g');
var rightBracketCjk = new RegExp("([\\)\\]\\}<>\u201D])([".concat(cjk, "])"), 'g');
var leftBracketAnyRightBracket = /([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/;
var cjkAns = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9\$%\^&\*\-=\+\\\|/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g;
var ansCjk = /([A-Za-z0-9~\$%\^&\*\-=\+\\\|/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;

var Pangu = function () {
  function Pangu() {
    _classCallCheck(this, Pangu);
  }

  _createClass(Pangu, [{
    key: "convertToFullwidth",
    value: function convertToFullwidth(symbols) {
      return symbols.replace(/~/g, '～').replace(/!/g, '！').replace(/;/g, '；').replace(/:/g, '：').replace(/,/g, '，').replace(/\./g, '。').replace(/\?/g, '？');
    }
  }, {
    key: "spacing",
    value: function spacing(text) {
      if (typeof text !== 'string') {
        console.warn("Pangu.spacing(text) only accepts string but got ".concat(_typeof(text)));
        return text;
      }

      if (text.length <= 1 || !anyCjk.test(text)) {
        return text;
      }

      var self = this;

      if (text.includes('冰與火之歌》中維斯特洛7')) {
        console.log('core', text);
      }

      var newText = text;
      newText = newText.replace(convertToFullwidthCjkSpaceSymbolsSpaceCjk, function (match, leftCjk, symbols, rightCjk) {
        var fullwidthSymbols = self.convertToFullwidth(symbols);
        return "".concat(leftCjk).concat(fullwidthSymbols).concat(rightCjk);
      });
      newText = newText.replace(convertToFullwidthCjkSymbolsAn, function (match, cjk, symbols, an) {
        var fullwidthSymbols = self.convertToFullwidth(symbols);
        return "".concat(cjk).concat(fullwidthSymbols).concat(an);
      });
      newText = newText.replace(fixCjkColonAns, '$1：$2');
      newText = newText.replace(cjkQuote, '$1 $2');
      newText = newText.replace(quoteCJK, '$1 $2');
      newText = newText.replace(fixQuote, '$1$3$5');
      newText = newText.replace(possessiveSingleQuote, "$1's");
      newText = newText.replace(hashAnsCjkHash, '$1 $2$3$4 $5');
      newText = newText.replace(cjkHash, '$1 $2');
      newText = newText.replace(hashCJK, '$1 $3');
      newText = newText.replace(cjkOperatorAns, '$1 $2 $3');
      newText = newText.replace(ansOperatorCjk, '$1 $2 $3');
      newText = newText.replace(fixSlashSpaceAns, '$1$3');
      newText = newText.replace(fixAnsSlashSpace, '$1$2$4');
      newText = newText.replace(cjkLeftBracket, '$1 $2');
      newText = newText.replace(rightBracketCjk, '$1 $2');
      newText = newText.replace(leftBracketAnyRightBracket, '$1$3$5');
      newText = newText.replace(cjkAns, '$1 $2');
      newText = newText.replace(ansCjk, '$1 $2');
      return newText;
    }
  }, {
    key: "spacingText",
    value: function spacingText(text) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var newText;

      try {
        newText = this.spacing(text);
      } catch (err) {
        callback(err);
        return;
      }

      callback(null, newText);
    }
  }, {
    key: "spacingTextSync",
    value: function spacingTextSync(text) {
      return this.spacing(text);
    }
  }]);

  return Pangu;
}();

var pangu = new Pangu();
module.exports = pangu;
module.exports.default = pangu;
module.exports.Pangu = Pangu;