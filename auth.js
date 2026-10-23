// Register and login (used by register.html and login.html)
function hash(s) {
  if (window.crypto && crypto.subtle) return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (b) { return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, "0"); }).join(""); });
  return Promise.resolve(btoa(s));
}

if ($("regForm")) $("regForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = $("rName").value.trim(), email = $("rEmail").value.trim().toLowerCase(), p = $("rPass").value;
  var users = get("th_users", []);
  if (p.length < 6) return popup(false, "Weak password", "Use at least 6 characters.");
  if (p !== $("rPass2").value) return popup(false, "Passwords differ", "The two passwords do not match.");
  if (users.some(function (u) { return u.email === email; })) return popup(false, "Account exists", "That email is already registered. Try logging in.");
  hash(p).then(function (h) {
    load(function () {
      users.push({ name: name, email: email, pass: h, joined: new Date().toLocaleDateString() });
      put("th_users", users); put("th_session", email);
      put("th_flash", { ok: true, title: "Account created", text: "Welcome, " + name + "! You are now logged in." });
      location.href = "dashboard.html";
    });
  });
});

if ($("loginForm")) $("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = $("lEmail").value.trim().toLowerCase();
  hash($("lPass").value).then(function (h) {
    load(function () {
      var u = get("th_users", []).find(function (x) { return x.email === email && x.pass === h; });
      if (!u) return popup(false, "Login failed", "Wrong email or password. Please try again.");
      put("th_session", email);
      put("th_flash", { ok: true, title: "Welcome back", text: "Hello " + u.name + ", you are logged in." });
      location.href = "dashboard.html";
    });
  });
});

if (location.search.indexOf("need=1") > -1) popup(false, "Login required", "Please log in to open your dashboard.");
