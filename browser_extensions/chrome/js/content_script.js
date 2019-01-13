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

  // TODO: async.queue()
  // https://www.jsdelivr.com/package/npm/lodash
  // https://www.jsdelivr.com/package/npm/async

  // TODO: Forced reflow while executing JavaScript took 136ms
  // TODO: requestIdleCallback
  // TODO: createTreeWalker

  // var queue = async.queue(function(node, callback) {
  //     console.log('node', node);
  //     callback();
  // }, 1);

  setTimeout(() => {
    pangu.spacingPage();
  }, 1000);

  var mutatedNodes = [];

  // TODO
  // put every node into a queue
  // and make sure there is only one worker to process the queue?
  // it seems is ok to have many workers?
  // if there are more workers trigger by debounce means the processing is too slow

  debouncedSpacingNodes = _.debounce((workerName) => {
    console.log(`${workerName} started: mutatedNodes.length`, mutatedNodes.length);

    // a single node could be very big which contains a lot of child nodes
    while (mutatedNodes.length) {
      var node = mutatedNodes.shift();
      if (node) {
        // TODO: there could be node.textContent or node.data
        pangu.spacingNode(node);
      }
    }

    console.log(`${workerName} finished`);
  }, 300, {'maxWait': 1000});

  let workerCounter = 1;
  var observer = new MutationObserver(function(mutations, observer) {
    // Element: https://developer.mozilla.org/en-US/docs/Web/API/Element
    // Text: https://developer.mozilla.org/en-US/docs/Web/API/Text
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
        case 'childList':
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              mutatedNodes.push(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
              mutatedNodes.push(node.parentNode);
            }
          });
          break;
        case 'characterData':
          const node = mutation.target;
          if (node.nodeType === Node.TEXT_NODE) {
            mutatedNodes.push(node.parentNode);
          }
          break;
      }
    });

    debouncedSpacingNodes(`worker${workerCounter}`);
    workerCounter += 1;
  });
  observer.observe(document.body, {
    characterData: true,
    childList: true,
    subtree: true
  });
});
