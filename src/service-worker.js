chrome.runtime.onInstalled.addListener(() => {
  console.log("首次加载...");
});

// document.addEventListener("mousemove", function (e) {
//   let elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
//   if (elementUnderCursor) {
//     console.log(elementUnderCursor.innerText);
//     alert(elementUnderCursor.innerText);
//   }
// });
