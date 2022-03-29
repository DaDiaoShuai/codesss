function jsonp(url, jsonpCallback, cb) {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";

  window[jsonpCallback] = function (data) {
    cb && cb(data);
  };
  document.appendChild(script);
}
