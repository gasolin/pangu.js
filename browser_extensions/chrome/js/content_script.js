var is_spacing = false; // 是不是正在插入空格？
var already_bind = false; // 是不是已經對 document 綁定過 event？
var node_hash = {}; // 避免同一個 DOM node 一直觸發 DOMSubtreeModified

// function go_page_spacing() {
//   is_spacing = true;
//   pangu.spacingPage();
//   is_spacing = false;
// }

// function go_node_spacing(node) {
//   if (!node.textContent) {
//     return false;
//   }

//   is_spacing = true;
//   pangu.spacingNode(node);
//   is_spacing = false;
// }

function ask_can_spacing() {
  chrome.runtime.sendMessage({purpose: 'can_spacing'},
    function(response) {
      if (response.result) {
        // go_page_spacing();

        // TODO
        // 改用 callback / promise
        // 真的有插入空格才提示「空格之神顯靈了」
        // ask_can_notify(false);

        /*
         這一段是為了對付那些透過 JavaScript 動態修改或 AJAX 加載的內容
         當頁面 DOM 有變動時
         就再執行一次 spacing
         */
        if (!already_bind) {
          document.body.addEventListener('DOMSubtreeModified', function(e) {
            Han(document.body)
            .initCond()
            // .renderElem()
            // .renderHanging()
            // .renderJiya()
            .renderHWS()
            // .correctBasicBD()
            // .substCombLigaWithPUA()

            // if (!is_spacing) {
            //   pangu.spacingPageTitle();

            //   // 一開始拿到的 e.target 似乎不會是最終的 node，所以設個 timer
            //   setTimeout(function() {
            //     var node = e.target;
            //     var id = node.id;

            //     if (id) {
            //       var spacing_timer = node_hash[id];
            //       clearTimeout(spacing_timer);
            //       node_hash[id] = setTimeout(function() {
            //         go_node_spacing(node);
            //       }, 10);
            //     }
            //     else {
            //       go_node_spacing(node);
            //     }
            //   }, 100);
            // }
          }, false);

          already_bind = true;
        }
      }
    }
  );
}

ask_can_spacing();
