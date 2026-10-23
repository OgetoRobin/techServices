// Request form (used by request.html)
var form = $("reqForm");
var pick = new URLSearchParams(location.search).get("service");
if (pick) $("service").value = pick;

function buildMessage() {
  if (!form.reportValidity()) return null;
  var v = function (id) { return $(id).value.trim(); };
  return "SERVICE REQUEST\nName: " + v("name") + "\nPhone: " + v("phone") + "\nEmail: " + (v("email") || "-") +
    "\nInstitution: " + (v("uni") || "-") + "\nService: " + v("service") + "\nDetails: " + v("details");
}
function record(via) {
  var u = cur();
  if (!u) return toast("Tip: create an account to track your requests.");
  var r = get("th_req_" + u.email, []);
  r.push({ service: $("service").value, date: new Date().toLocaleDateString(), via: via });
  put("th_req_" + u.email, r);
}
$("sendWa").onclick = function () {
  var m = buildMessage(); if (!m) return;
  window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(m), "_blank");
  record("WhatsApp"); popup(true, "Request ready", "WhatsApp has opened with your details. Press send there to finish.");
};
$("sendMail").onclick = function () {
  var m = buildMessage(); if (!m) return;
  record("Email");
  location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Service Request") + "&body=" + encodeURIComponent(m);
};
