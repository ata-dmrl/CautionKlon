/* Shared header + footer, injected into every page.
   Pages set <body data-root="../"> when they live in a subfolder. */
(function () {
  var R = document.body.dataset.root || "";
  var EXT = 'target="_blank" rel="noopener noreferrer"';
  var LINKS = {
    docs: "https://docs.caution.co/",
    dashboard: "https://dashboard.caution.co/",
    yc: "https://www.ycombinator.com/launches/SIq-caution-hosting-platform-for-software-you-can-t-afford-to-have-hacked",
    git: "https://codeberg.org/Caution/",
    mastodon: "https://mstdn.social/@caution"
  };
  var logo = '<svg viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><path d="M13 2 L16.2 7.6 L9.8 7.6 Z"/><path d="M8.6 9.6 L11.8 15.2 L2.2 21.4 Z"/><path d="M17.4 9.6 L23.8 21.4 L14.2 15.2 Z"/><path d="M5 23.6 L21 23.6 L13 18.6 Z"/></svg>';
  var chev = '<svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>';
  var toggle = '<button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle theme">' +
    '<svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>' +
    '<svg class="moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg></button>';
  function item(href, icon, title, desc) {
    return '<a href="' + href + '" class="dropdown-item">' + icon + "<span><b>" + title + "</b><small>" + desc + "</small></span></a>";
  }
  var ic = {
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l5.5-3.5z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14a4 4 0 0 1 3-6.7A6 6 0 0 1 18.5 9 3.5 3.5 0 0 1 18 16H6"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
  };

  var header =
    '<div class="announce" id="announce">Caution is backed by Y Combinator. <a href="' + LINKS.yc + '" ' + EXT + '>Learn more</a>.' +
    '<button type="button" aria-label="Dismiss announcement" id="announce-close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
    '<header class="header" id="header"><div class="nav">' +
      '<a href="' + R + 'index.html" class="logo" aria-label="Caution home">' + logo + "Caution</a>" +
      '<nav class="nav-center" aria-label="Main">' +
        '<div class="dropdown"><button class="nav-link" aria-haspopup="true">Platform ' + chev + '</button><div class="dropdown-menu">' +
          item(R + "platform-tour.html", ic.play, "Platform tour", "Watch Caution in action") +
          item(R + "cloud/aws.html", ic.cloud, "AWS Nitro", "Deploy on AWS Nitro Enclaves") +
          item(R + "faq.html", ic.help, "FAQ", "Common questions answered") +
        "</div></div>" +
        '<div class="dropdown"><button class="nav-link" aria-haspopup="true">Resources ' + chev + '</button><div class="dropdown-menu">' +
          item(R + "blog.html", ic.pen, "Blog", "Engineering insights and updates") +
          item(R + "security-controls.html", ic.shield, "Security evidence", "Trust model, evidence, and framework alignment") +
          item(R + "about.html", ic.info, "About", "Learn more about Caution") +
        "</div></div>" +
        '<a href="' + LINKS.docs + '" class="nav-link" ' + EXT + '>Docs</a>' +
        '<a href="' + R + 'customers.html" class="nav-link">Customers</a>' +
        '<a href="' + R + 'pricing.html" class="nav-link">Pricing</a>' +
      "</nav>" +
      '<div class="nav-right"><a href="' + LINKS.dashboard + '" class="nav-link">Log in</a><a href="' + R + 'contact.html" class="nav-cta">Book a demo</a>' + toggle + "</div>" +
      '<div class="mobile-tools"><button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false"><div><span></span><span></span><span></span></div></button>' + toggle + "</div>" +
    "</div>" +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<a href="' + R + 'platform-tour.html">Platform tour</a><a href="' + R + 'cloud/aws.html">AWS Nitro</a><a href="' + R + 'faq.html">FAQ</a>' +
      '<a href="' + R + 'blog.html">Blog</a><a href="' + R + 'security-controls.html">Security evidence</a><a href="' + R + 'about.html">About</a>' +
      '<a href="' + LINKS.docs + '" ' + EXT + '>Docs</a><a href="' + R + 'customers.html">Customers</a><a href="' + R + 'pricing.html">Pricing</a>' +
      '<a href="' + LINKS.dashboard + '">Log in</a><a href="' + R + 'contact.html" class="nav-cta">Book a demo</a>' +
    "</div></header>";

  var footer =
    '<footer class="footer"><div class="container"><div class="footer-top">' +
      '<div class="footer-brand"><a href="' + R + 'index.html" class="logo">' + logo + "Caution</a><p>Confidential compute you can verify, not trust.</p></div>" +
      '<div class="footer-links">' +
        '<div class="footer-col"><h4>Platform</h4><a href="' + LINKS.dashboard + '">Dashboard</a><a href="' + R + 'platform-tour.html">Platform tour</a><a href="' + R + 'cloud/aws.html">AWS Nitro</a><a href="' + R + 'faq.html">FAQ</a></div>' +
        '<div class="footer-col"><h4>Resources</h4><a href="' + LINKS.docs + '" ' + EXT + '>Documentation</a><a href="' + R + 'pricing.html">Pricing</a><a href="' + R + 'blog.html">Blog</a><a href="' + R + 'security-controls.html">Security evidence</a></div>' +
        '<div class="footer-col"><h4>Company</h4><a href="' + R + 'customers.html">Customers</a><a href="' + R + 'about.html">About</a><a href="' + R + 'contact.html">Contact</a><a href="' + R + 'legal.html">Legal</a></div>' +
      "</div></div>" +
      '<div class="footer-bottom"><p>© 2026 Caution SEZC. All rights reserved.</p>' +
        '<nav><a href="https://caution.co/privacy.html" ' + EXT + '>Privacy</a><a href="https://caution.co/terms.html" ' + EXT + '>Terms</a><a href="https://caution.co/legal/refunds.html" ' + EXT + '>Refunds</a></nav>' +
        '<div class="social">' +
          '<a href="' + LINKS.git + '" ' + EXT + ' aria-label="Git" title="Access source code and documentation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M8 6h4a4 4 0 0 1 4 4v0"/></svg></a>' +
          '<a href="' + LINKS.mastodon + '" ' + EXT + ' aria-label="Mastodon" title="Follow us on Mastodon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 8c0-4-2.7-5.2-2.7-5.2C15.6 1.6 8.4 1.6 5.7 2.8 5.7 2.8 3 4 3 8c0 5.7-.4 12.4 6 13.6 2.5.5 5 0 6.5-.6l-.2-1.6s-2 .6-4 .5c-2 0-4.1-.2-4.4-2.5 4.6 1 8.2.4 9.6.2 2.4-.3 4.5-1.8 4.6-3.6C21.2 12 21 11.4 21 8Z"/><path d="M8 13V8.5a2 2 0 0 1 4 0V11m0 0V8.5a2 2 0 0 1 4 0V13"/></svg></a>' +
        "</div></div></div></footer>";

  document.getElementById("site-header").outerHTML = header;
  document.getElementById("site-footer").outerHTML = footer;

  // Highlight the current page in the nav
  var here = location.pathname.split("/").slice(-2).join("/");
  Array.prototype.forEach.call(document.querySelectorAll(".nav-center a, .dropdown-item, .mobile-menu a"), function (a) {
    var p = a.getAttribute("href").replace(/^(\.\.\/)+/, "");
    if (p && here.slice(-p.length) === p) a.classList.add("current");
  });
})();
