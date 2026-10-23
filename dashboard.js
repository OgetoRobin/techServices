// Dashboard (used by dashboard.html)
var u = cur();
if (!u) { location.replace("login.html?need=1"); }
else {
  var r = get("th_req_" + u.email, []);
  $("dWelcome").textContent = "Welcome back, " + u.name + " 👋";
  $("sTotal").textContent = r.length;
  $("sLast").textContent = r.length ? r[r.length - 1].service : "-";
  $("sSince").textContent = u.joined;
  if (!r.length) $("reqList").innerHTML = "<div class='item'>No requests yet. Send one from the Request Service page.</div>";
  r.slice().reverse().forEach(function (x) {
    var d = document.createElement("div"); d.className = "item";
    d.innerHTML = "<strong></strong><span class='note'></span>";
    d.firstChild.textContent = x.service; d.lastChild.textContent = x.date + " · via " + x.via;
    $("reqList").appendChild(d);
  });
  $("clearReq").onclick = function () { put("th_req_" + u.email, []); location.reload(); };
}
