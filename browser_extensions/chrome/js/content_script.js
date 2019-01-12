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

  // TODO: async.cargo()
  // https://www.jsdelivr.com/package/npm/lodash
  // https://www.jsdelivr.com/package/npm/async

  // TODO: Forced reflow while executing JavaScript took 136ms
  // TODO: requestIdleCallback
  // TODO: createTreeWalker

  var mutatedNodes = [];

  debouncedSpacingNodes = _.debounce(() => {
    // console.log('debouncedSpacingNodes');
    console.log('start: mutatedNodes.length', mutatedNodes.length);

    mutatedNodes = _.uniq(mutatedNodes);
    console.log('de-dup: mutatedNodes.length', mutatedNodes.length);

    // a single node could be very big which contains a lot of child nodes
    while (mutatedNodes.length) {
      console.log('process: mutatedNodes.length', mutatedNodes.length);
      var node = mutatedNodes.shift();
      console.log(node);
      if (node && node.textContent) {
        pangu.spacingNode(node);
      }
    }

    console.log('end: mutatedNodes.length', mutatedNodes.length);
  }, 300, {'maxWait': 1000});

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

    debouncedSpacingNodes();
  });
  observer.observe(document.body, {
    characterData: true,
    childList: true,
    subtree: true
  });
});
