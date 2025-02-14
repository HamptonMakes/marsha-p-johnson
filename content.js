// Debounce function to limit how often we process changes
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Improved text modification function
function modifyText() {
  // Skip if we're already processing
  if (modifyText.isProcessing) return;
  modifyText.isProcessing = true;

  const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          return node.nodeValue.includes("LGB") ?
              NodeFilter.FILTER_ACCEPT :
              NodeFilter.FILTER_REJECT;
        }
      }
  );

  let node;
  while ((node = walker.nextNode())) {
    node.nodeValue = node.nodeValue.replace(/LGB(?!T)/g, "LGBTQ+🧱");
  }

  modifyText.isProcessing = false;
}

// Run initial modification immediately if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(modifyText, 1);
} else {
  // Otherwise wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', modifyText);
}

// Debounced observer for dynamic content
const debouncedModify = debounce(modifyText, 250);

const observer = new MutationObserver((mutations) => {
  if (mutations.some(mutation =>
      mutation.type === 'characterData' ||
      mutation.addedNodes.length > 0
  )) {
    debouncedModify();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});
