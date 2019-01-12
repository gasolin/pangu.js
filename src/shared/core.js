// CJK is short for Chinese, Japanese, and Korean.
//
// CJK includes following Unicode blocks:
// \u2e80-\u2eff CJK Radicals Supplement
// \u2f00-\u2fdf Kangxi Radicals
// \u3040-\u309f Hiragana
// \u30a0-\u30ff Katakana
// \u3100-\u312f Bopomofo
// \u3200-\u32ff Enclosed CJK Letters and Months
// \u3400-\u4dbf CJK Unified Ideographs Extension A
// \u4e00-\u9fff CJK Unified Ideographs
// \uf900-\ufaff CJK Compatibility Ideographs
//
// For more information about Unicode blocks, see
// http://unicode-table.com/en/
// https://github.com/vinta/pangu
const cjk = '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff';

// ANS is short for Alphabets, Numbers, and Symbols.
//
// A includes A-Za-z
// N includes 0-9
// S includes `~!@#$%^&*()-_=+[]{}\|;:'",<.>/?
//
// Some S does not include all symbols.
const a = 'A-Za-z';
const n = '0-9';

const anyCjk = new RegExp(`[${cjk}]`);

// 需要特別處理的規則

// The symbols part only includes + - * / = & | < >
const cjkOperatorAns = new RegExp(`([${cjk}])([\\+\\-\\*\\/=&\\|<>])([A-Za-z0-9])`, 'g');
const ansOperatorCjk = new RegExp(`([A-Za-z0-9])([\\+\\-\\*\\/=&\\|<>])([${cjk}])`, 'g');

const hashANSCJKhash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
const hashAnsCjkHash = new RegExp(`([${cjk}])(#)([A-Za-z0-9\u2e80-\ufaff]+)(#)([${cjk}])`, 'g');
const cjkHash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g;
// const cjkHash = new RegExp(`()(#([^ ]))`, 'g');
const hashCJK = /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
const hashCjk = new RegExp(``, 'g');

const fixSlashSpaceAns = new RegExp('([\\/])( )([a-z0-9\\-_\\.\\/]+)', 'g');
const fixAnsSlashSpace = new RegExp('([\\/\\.])([A-Za-z0-9\\-_\\.\\/]+)( )([\\/])', 'g');

// The ans part does not include ` @ # _ | ' "
const cjkAnsCjk = new RegExp(`([${cjk}])([A-Za-z0-9\`~\\!\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:,\\<\\.\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([${cjk}])`, 'g');

const fixCjkColonA = new RegExp(`([${cjk}])\\:([A-Z0-9])`, 'g');

// The ans part does not include . ( ) [ ] { }
const cjkSpaceAnsCjk = new RegExp(`([${cjk}])([\\s]+)([A-Za-z0-9\`~\\!#\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:'",\\<\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([${cjk}])`, 'g');
const cjkAnsSpaceCjk = new RegExp(`([${cjk}])([A-Za-z0-9\`~\\!#\\$%\\^&\\*\\(\\)\\-\\=\\+\\[\\]\\{\\}\\\\;\\:'",\\<\\>\\/\\?\\u00a1-\\u00ff\\u2022\\u2027\\u2150-\\u218f]+)([\\s]+)([${cjk}])`, 'g');

const cjkSymbolCjkAddLeftSpace = new RegExp(`([${cjk}])([@])([${cjk}])`, 'g');

// 總是成立的規則

const cjkAns = new RegExp(`([${cjk}])([A-Za-z0-9@#])`, 'g');
const ansCjk = new RegExp(`([A-Za-z0-9])([${cjk}])`, 'g');

const anLeftSymbol = new RegExp('([A-Za-z0-9])([\\(\\[\\{])', 'g');
const rightSymbolAn = new RegExp('([\\)\\]\\}])([A-Za-z0-9])', 'g');

// The symbols part only includes ~ ! ; : , . ? and space
const cjkSpaceSymbolsSpaceCjk = new RegExp(`([${cjk}])([ ]*)([~\\!;\\:,\\.\\?]+)([ ]*)([${cjk}])`, 'g');

// ---

// // cjkQuote >> 跟 Go 版差了一個 ' 符號
// // quoteCJK >> 跟 Go 版差了一個 ' 符號
// const cjkQuote = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["])/g;
// const quoteCJK = /(["])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
// const fixQuote = /(["']+)(\s*)(.+?)(\s*)(["']+)/g;
// const fixSingleQuote = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])( )(')([A-Za-z])/g;

// const hashANSCJKhash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
// const cjkHash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g;
// const hashCJK = /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;

// const cjkOperatorAns = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\+\-\*\/=&\\|<>])([A-Za-z0-9])/g;
// const ansOperatorCjk = /([A-Za-z0-9])([\+\-\*\/=&\\|<>])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;

// const cjkBracketCJK = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c]+(.*?)[\)\]\}>\u201d]+)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
// const cjkBracket = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c>])/g;
// const bracketCJK = /([\)\]\}>\u201d<])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
// const fixBracket = /([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/;

// const fixSymbol = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([~!;:,\.\?\u2026])([A-Za-z0-9])/g;

// const cjkANS = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9`\$%\^&\*\-=\+\\\|/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g;
// const ansCJK = /([A-Za-z0-9`~\$%\^&\*\-=\+\\\|/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;

class Pangu {
  spacing(text) {
    if (typeof text !== 'string') {
      console.warn(`Pangu.spacing(text) only accepts string but got ${typeof text}`);
      return text;
    }

    if (!anyCjk.test(text)) {
      return text;
    }

    // function noop() {}
    // console.log = noop;

    let newText = text;
    // console.log(0, 'newText', newText);

    // https://stackoverflow.com/questions/4285472/multiple-regex-replace
    newText = newText.replace(cjkSpaceSymbolsSpaceCjk, (match, cjk1, space1, symbols, space2, cjk2) => {
      symbols = symbols.replace(/~/g, '～');
      symbols = symbols.replace(/!/g, '！');
      symbols = symbols.replace(/;/g, '；');
      symbols = symbols.replace(/:/g, '：');
      symbols = symbols.replace(/,/g, '，');
      symbols = symbols.replace(/\./g, '。');
      symbols = symbols.replace(/\?/g, '？');

      return `${cjk1}${symbols}${cjk2}`;
    });
    // console.log(0, 'cjkSpaceSymbolsSpaceCjk', newText);

    newText = newText.replace(cjkOperatorAns, '$1 $2 $3');
    // console.log(0, 'cjkOperatorAns', newText);

    newText = newText.replace(ansOperatorCjk, '$1 $2 $3');
    // console.log(0, 'ansOperatorCjk', newText);

    newText = newText.replace(fixSlashSpaceAns, '$1$3');
    // console.log(0, 'fixSlashSpaceAns', newText);

    newText = newText.replace(fixAnsSlashSpace, '$1$2$4');
    // console.log(0, 'fixAnsSlashSpace', newText);

    newText = newText.replace(cjkAnsCjk, '$1 $2 $3');
    // console.log(0, 'cjkAnsCjk', newText);

    newText = newText.replace(cjkSpaceAnsCjk, '$1$2$3 $4');
    // console.log(0, 'cjkSpaceAnsCjk', newText);

    newText = newText.replace(cjkAnsSpaceCjk, '$1 $2$3$4');
    // console.log(0, 'cjkAnsSpaceCjk', newText);

    newText = newText.replace(cjkSymbolCjkAddLeftSpace, '$1 $2$3');
    // console.log(0, 'cjkSymbolCjkAddLeftSpace', newText);

    newText = newText.replace(cjkAns, '$1 $2');
    // console.log(0, 'cjkAns', newText);

    newText = newText.replace(ansCjk, '$1 $2');
    // console.log(0, 'ansCjk', newText);

    newText = newText.replace(anLeftSymbol, '$1 $2');
    // console.log(0, 'anLeftSymbol', newText);

    newText = newText.replace(rightSymbolAn, '$1 $2');
    // console.log(0, 'rightSymbolAn', newText);

    // newText = newText.replace(cjkQuote, '$1 $2');
    // newText = newText.replace(quoteCJK, '$1 $2');
    // newText = newText.replace(fixQuote, '$1$3$5');
    // newText = newText.replace(fixSingleQuote, '$1$3$4');

    // newText = newText.replace(hashANSCJKhash, '$1 $2$3$4 $5');
    // newText = newText.replace(cjkHash, '$1 $2');
    // newText = newText.replace(hashCJK, '$1 $3');

    // // newText = newText.replace(cjkOperatorAns, '$1 $2 $3');
    // // newText = newText.replace(ansOperatorCjk, '$1 $2 $3');

    // const oldText = newText;
    // const tmpText = newText.replace(cjkBracketCJK, '$1 $2 $4');
    // newText = tmpText;
    // if (oldText === tmpText) {
    //   newText = newText.replace(cjkBracket, '$1 $2');
    //   newText = newText.replace(bracketCJK, '$1 $2');
    // }
    // newText = newText.replace(fixBracket, '$1$3$5');

    // // newText = newText.replace(fixSymbol, '$1$2 $3');

    // newText = newText.replace(cjkANS, '$1 $2');
    // newText = newText.replace(ansCJK, '$1 $2');

    return newText;
  }

  spacingText(text, callback = () => {}) {
    try {
      const newText = this.spacing(text);
      callback(null, newText);
    } catch (err) {
      callback(err);
    }
  }

  spacingTextSync(text) {
    return this.spacing(text);
  }
}

const pangu = new Pangu();

module.exports = pangu;
module.exports.default = pangu;
module.exports.Pangu = Pangu;
