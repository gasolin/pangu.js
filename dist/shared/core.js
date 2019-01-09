"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cjk = "\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF";
var a = 'A-Za-z';
var n = '0-9';
var anyCjk = new RegExp("[".concat(cjk, "]"));
var cjkOperatorAns = new RegExp("([".concat(cjk, "])([\\+\\-\\*\\/=&\\|<>])([A-Za-z0-9])"), 'g');
var ansOperatorCjk = new RegExp("([A-Za-z0-9])([\\+\\-\\*\\/=&\\|<>])([".concat(cjk, "])"), 'g');
var fixSlashSpaceAns = new RegExp('([\\/])( )([a-z0-9\\-_\\.\\/]+)', 'g');
var fixAnsSlashSpace = new RegExp('([\\/\\.])([A-Za-z0-9\\-_\\.\\/]+)( )([\\/])', 'g');
var cjkAnsCjk = new RegExp("([".concat(cjk, "])([A-Za-z0-9`~\\!\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:'\",\\<\\.\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([").concat(cjk, "])"), 'g');
var fixCjkColonA = new RegExp("([".concat(cjk, "])\\:([A-Z0-9])"), 'g');
var cjkSpaceAnsCjk = new RegExp("([".concat(cjk, "])([\\s]+)([A-Za-z0-9`~\\!#\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:'\",\\<\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([").concat(cjk, "])"), 'g');
var cjkAnsSpaceCjk = new RegExp("([".concat(cjk, "])([A-Za-z0-9`~\\!#\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:'\",\\<\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([\\s]+)([").concat(cjk, "])"), 'g');
var cjkSymbolCjkAddLeftSpace = new RegExp("([".concat(cjk, "])([@])([").concat(cjk, "])"), 'g');
var cjkAns = new RegExp("([".concat(cjk, "])([A-Za-z0-9@#])"), 'g');
var ansCjk = new RegExp("([A-Za-z0-9])([".concat(cjk, "])"), 'g');
var anLeftSymbol = new RegExp('([A-Za-z0-9])([\\(\\[\\{])', 'g');
var rightSymbolAn = new RegExp('([\\)\\]\\}])([A-Za-z0-9])', 'g');
var cjkSpaceSymbolsSpaceCjk = new RegExp("([".concat(cjk, "])([ ]*)([~\\!;\\:,\\.\\?]+)([ ]*)([").concat(cjk, "])"), 'g');

var Pangu = function () {
  function Pangu() {
    _classCallCheck(this, Pangu);
  }

  _createClass(Pangu, [{
    key: "spacing",
    value: function spacing(text) {
      if (typeof text !== 'string') {
        console.warn("Pangu.spacing(text) only accepts string but got ".concat(_typeof(text)));
        return text;
      }

      if (!anyCjk.test(text)) {
        return text;
      }

      var newText = text;
      console.log(0, 'newText', newText);
      newText = newText.replace(cjkSpaceSymbolsSpaceCjk, function (match, cjk1, space1, symbols, space2, cjk2) {
        symbols = symbols.replace(/~/g, '～');
        symbols = symbols.replace(/!/g, '！');
        symbols = symbols.replace(/;/g, '；');
        symbols = symbols.replace(/:/g, '：');
        symbols = symbols.replace(/,/g, '，');
        symbols = symbols.replace(/\./g, '。');
        symbols = symbols.replace(/\?/g, '？');
        return "".concat(cjk1).concat(symbols).concat(cjk2);
      });
      console.log(0, 'cjkSpaceSymbolsSpaceCjk', newText);
      newText = newText.replace(cjkOperatorAns, '$1 $2 $3');
      console.log(0, 'cjkOperatorAns', newText);
      newText = newText.replace(ansOperatorCjk, '$1 $2 $3');
      console.log(0, 'ansOperatorCjk', newText);
      newText = newText.replace(fixSlashSpaceAns, '$1$3');
      console.log(0, 'fixSlashSpaceAns', newText);
      newText = newText.replace(fixAnsSlashSpace, '$1$2$4');
      console.log(0, 'fixAnsSlashSpace', newText);
      newText = newText.replace(cjkAnsCjk, '$1 $2 $3');
      console.log(0, 'cjkAnsCjk', newText);
      newText = newText.replace(cjkSpaceAnsCjk, '$1$2$3 $4');
      console.log(0, 'cjkSpaceAnsCjk', newText);
      newText = newText.replace(cjkAnsSpaceCjk, '$1 $2$3$4');
      console.log(0, 'cjkAnsSpaceCjk', newText);
      newText = newText.replace(cjkSymbolCjkAddLeftSpace, '$1 $2$3');
      console.log(0, 'cjkSymbolCjkAddLeftSpace', newText);
      newText = newText.replace(cjkAns, '$1 $2');
      console.log(0, 'cjkAns', newText);
      newText = newText.replace(ansCjk, '$1 $2');
      console.log(0, 'ansCjk', newText);
      newText = newText.replace(anLeftSymbol, '$1 $2');
      console.log(0, 'anLeftSymbol', newText);
      newText = newText.replace(rightSymbolAn, '$1 $2');
      console.log(0, 'rightSymbolAn', newText);
      return newText;
    }
  }, {
    key: "spacingText",
    value: function spacingText(text) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      try {
        var newText = this.spacing(text);
        callback(null, newText);
      } catch (err) {
        callback(err);
      }
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