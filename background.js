var url = "";

chrome.webRequest.onBeforeRequest.addListener(
  function (info) {
    //checks request is main page request and not a resource
    if (info.type == "main_frame") {
      url = info.url;
      console.log(url);
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

var userAgent =
  "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/092754";

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    //needs to be more specific
    if (url.includes("tv")) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === "User-Agent") {
          details.requestHeaders[i].value = userAgent;
          break;
        }
      }
    }
    
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);
