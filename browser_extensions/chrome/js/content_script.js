// var is_spacing = false; // 是不是正在插入空格？
// var already_bind = false; // 是不是已經對 document 綁定過 event？
// var node_hash = {}; // 避免同一個 DOM node 一直觸發 DOMSubtreeModified

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

var throttle = function(fn, delay, mustRunDelay) {
  var timer = null;
  var t_start;
  return function() {
    var context = this;
    var args = arguments;
    var t_curr = new Date();

    clearTimeout(timer);

    if (!t_start) {
      t_start = t_curr;
    }

    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args);
      t_start = t_curr;
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  };
};

chrome.runtime.sendMessage({purpose: 'can_spacing'}, function(response) {
  if (!response.result) {
    return;
  }

  pangu.spacingPage();

  var observer = new MutationObserver(function(mutations, observer) {
    var mutatedNodes = [];

    mutations.forEach(function(mutation) {
      switch (mutation.type) {
        case 'childList':
          mutation.addedNodes.forEach(function(node) {
            mutatedNodes.push(node);
          });
          break;
        case 'characterData':
          mutatedNodes.push(mutation.target);
          break;
      }
    });

    mutatedNodes.forEach((node) => {
      pangu.spacingNode(node);
    });
  });
  observer.observe(document.body, {
    characterData: true,
    childList: true,
    subtree: true
  });
});
