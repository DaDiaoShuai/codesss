var r = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/g;
var s = "20210426141823";

s.replace(r, function (...args) {
  return (
    args[1] +
    "年" +
    args[2] +
    "月" +
    args[3] +
    "日" +
    " " +
    args[4] +
    ":" +
    args[5] +
    ":" +
    args[6]
  );
});
