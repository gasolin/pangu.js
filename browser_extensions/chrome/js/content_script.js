// var throttle = function(fn, delay, mustRunDelay) {
//   var timer = null;
//   var t_start;
//   return function() {
//     var self = this;
//     var args = arguments;
//     var t_curr = +new Date();

//     clearTimeout(timer);

//     if (!t_start) {
//       t_start = t_curr;
//     }

//     if (t_curr - t_start >= mustRunDelay) {
//       fn.apply(self, args);
//       t_start = t_curr;
//     } else {
//       timer = setTimeout(function() {
//         fn.apply(self, args);
//       }, delay);
//     }
//   };
// };

chrome.runtime.sendMessage({purpose: 'can_spacing'}, function(response) {
  if (!response.result) {
    return;
  }

  var mutatedNodes = [];

  throttledSpacingNodes = _.debounce(() => {
    while (mutatedNodes.length) {
      var node = mutatedNodes.shift();
      if (!node || !node.textContent) {
        continue;
      }
      pangu.spacingNode(node);
    }
  }, 300, {'maxWait': 1000});

  // TODO: async.cargo()

  pangu.spacingPage();

  var observer = new MutationObserver(function(mutations, observer) {
    console.log('mutations.length', mutations.length);

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

    // mutatedNodes.forEach((node) => {
    //   pangu.spacingNode(node);
    // });

    // throttledSpacingNodes();
  });
  observer.observe(document.body, {
    characterData: true,
    childList: true,
    subtree: true
  });
});
