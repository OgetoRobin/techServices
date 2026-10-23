// Shared settings and helpers (loaded on every page)
var PHONE = "254700000000";   // your WhatsApp number
var EMAIL = "you@example.com"; // your email

var $ = function (id) { return document.getElementById(id); };
function get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
function put(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function cur() { var e = get("th_session", null); return get("th_users", []).find(function (u) { return u.email === e; }); }

function load(cb, ms) { $("loader").classList.add("show"); setTimeout(function () { $("loader").classList.remove("show"); if (cb) cb(); }, ms || 1000); }
function popup(ok, title, text) { $("pIcon").textContent = ok ? "✅" : "❌"; $("pTitle").textContent = title; $("pText").textContent = text; $("popup").classList.add("open"); }
function toast(m) { var t = $("toast"); t.textContent = m; t.classList.add("show"); setTimeout(function () { t.classList.remove("show"); }, 3000); }

function refreshAuth() {
  var u = cur();
  $("guestBox").classList.toggle("hide", !!u);
  $("userBox").classList.toggle("hide", !u);
  if (u) $("meName").textContent = u.name;
}

document.querySelectorAll(".logout").forEach(function (b) {
  b.onclick = function () {
    load(function () {
      put("th_session", null);
      put("th_flash", { ok: true, title: "Logged out", text: "See you soon!" });
      location.href = "home.html";
    }, 700);
  };
});
document.addEventListener("click", function (e) {
  if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) $("popup").classList.remove("open");
});
$("menuBtn").onclick = function () { document.body.classList.toggle("nav-open"); };
$("scrim").onclick = function () { document.body.classList.remove("nav-open"); };
$("yr").textContent = new Date().getFullYear();

refreshAuth();
var flash = get("th_flash", null);
if (flash) { put("th_flash", null); popup(flash.ok, flash.title, flash.text); }
window.addEventListener("load", function () { setTimeout(function () { $("loader").classList.remove("show"); }, 600); });
