// Function to replace "LGB" with "LGBT" and add a trans pride flag
function modifyText() {
  // Select all text nodes in the document
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.includes("LGB")) {
      // Replace "LGB" with "LGBT🧱
      node.nodeValue = node.nodeValue.replace(/LGB/g, "LGBT🧱");
    }
  }
}

// Run the function when the page loads
modifyText();

// Optional: Observe DOM changes to handle dynamically loaded content
const observer = new MutationObserver(modifyText);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});
