(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  $$("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  /* ---------- Announcement ---------- */
  var announce = $("#announce");
  try { if (announce && localStorage.getItem("announce-dismissed") === "1") announce.classList.add("hidden"); } catch (e) {}
  if (announce) $("#announce-close").addEventListener("click", function () {
    announce.classList.add("hidden");
    try { localStorage.setItem("announce-dismissed", "1"); } catch (e) {}
  });

  /* ---------- Header ---------- */
  var header = $("#header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  var burger = $("#burger"), mobileMenu = $("#mobile-menu");
  burger.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", mobileMenu).forEach(function (a) {
    a.addEventListener("click", function () { mobileMenu.classList.remove("open"); burger.classList.remove("open"); });
  });
  $$(".dropdown > button").forEach(function (btn) {
    btn.addEventListener("click", function () { btn.parentNode.classList.toggle("open"); });
  });
  document.addEventListener("click", function (e) {
    $$(".dropdown.open").forEach(function (d) { if (!d.contains(e.target)) d.classList.remove("open"); });
  });

  /* ---------- Verified stacks ---------- */
  var check = '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  $$("[data-stack=verified]").forEach(function (ul) {
    ul.innerHTML = ["Application", "Runtime", "OS / Kernel", "Compiler / Toolchain"]
      .map(function (l) { return "<li>" + check + l + "</li>"; }).join("");
  });

  /* ---------- Logo marquee ---------- */
  var logos = ["Coinbase", "ether.fi", "Exodus", "Ledn", "Sidero Labs", "fitbit", "Zcash", "HashiCorp", "ANKR", "Turnkey", "Bishop Fox", "BitGo", "FalconX", "Mysten Labs", "Optimism", "TrustedStake"];
  $$(".logo-track").forEach(function (track) {
    track.innerHTML = logos.concat(logos).map(function (l, i) {
      return "<span" + (i >= logos.length ? ' aria-hidden="true"' : "") + ">" + l + "</span>";
    }).join("");
  });

  /* ---------- Differentiator heading ---------- */
  var title = $("#diff-title");
  if (title) title.innerHTML = title.dataset.words.split("|").map(function (w, i) {
    var muted = w.charAt(0) === "~";
    return '<span class="w' + (muted ? " muted" : "") + '" style="transition-delay:' + (i * 0.07) + 's">' + (muted ? w.slice(1) : w) + "</span>";
  }).join(" ");

  /* ---------- Scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  $$(".reveal").concat(title ? [title] : []).forEach(function (el) { io.observe(el); });

  /* ---------- Pixel illustrations ---------- */
  var art = {
    check: [
      "##..........##",
      "#............#",
      "..............",
      "...........##.",
      "..........##..",
      ".........##...",
      "..##....##....",
      "...##..##.....",
      "....####......",
      ".....##.......",
      "..............",
      "..............",
      "#............#",
      "##..........##"
    ],
    eye: [
      "##############",
      "#............#",
      "....#..#..#...",
      "....#..#..#...",
      "....######....",
      "..##......##..",
      ".##...###..##.",
      "##...#####..##",
      ".##...###..##.",
      "..##......##..",
      "....######....",
      "..............",
      "#............#",
      "##############"
    ],
    bolt: [
      "........######",
      ".......##...##",
      "......##...##.",
      ".....##...##..",
      "....##...##...",
      "...#######....",
      "......##......",
      ".....##.......",
      "....##........",
      "...##.........",
      "..##..........",
      ".##...........",
      "##............",
      "#............."
    ],
    loop: [
      "....######....",
      "..##......##..",
      ".#..........#.",
      "#............#",
      "#.........#.##",
      "#..........##.",
      "..............",
      "..............",
      ".##..........#",
      "##.#.........#",
      "#............#",
      ".#..........#.",
      "..##......##..",
      "....######...."
    ]
  };
  $$("svg[data-pix]").forEach(function (svg) {
    var grid = art[svg.dataset.pix], out = "";
    svg.setAttribute("viewBox", "0 0 182 182");
    grid.forEach(function (row, y) {
      row.split("").forEach(function (c, x) {
        if (c === "#") out += '<rect x="' + (x * 13) + '" y="' + (y * 13) + '" width="9" height="9" rx="1.5" style="animation-delay:' + ((x + y) * 0.03).toFixed(2) + 's"/>';
      });
    });
    svg.innerHTML = out;
  });

  /* ---------- Tabs ---------- */
  $$(".what-frame").forEach(function (frame) {
  var tabs = $$(".tab", frame), panels = $$(".panel", frame);
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var i = +tab.dataset.tab;
      tabs.forEach(function (t, j) { t.classList.toggle("active", i === j); });
      panels.forEach(function (p, j) {
        var on = i === j;
        p.classList.toggle("active", on);
        if (on) $$("rect", p).forEach(function (r) { r.style.animation = "none"; void r.offsetWidth; r.style.animation = ""; });
      });
    });
  });
  });

  /* ---------- Industry tickers / vertical marquee ---------- */
  var industries = ["Fintech", "Healthcare", "Biotech", "Government", "Public Sector", "AI / ML", "Blockchain", "Digital Assets", "Custody", "Key Management", "Identity and Auth", "Fraud and AML", "Data Collaboration"];
  $$("[data-ticker]").forEach(function (t) {
    var items = industries.concat(industries).map(function (s) { return "<span>" + s + "</span><i>&bull;</i>"; }).join("");
    t.innerHTML = items;
  });
  function shuffled(seed) {
    var a = industries.slice(), s = seed;
    for (var i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var durations = [110, 125, 95, 115];
  $$(".vmarquee").forEach(function (vm) { vm.innerHTML = durations.map(function (d, c) {
    var list = c === 0 ? industries : shuffled(c * 17);
    var spans = list.concat(list).map(function (s) { return "<span>" + s + "</span>"; }).join("");
    return '<div class="vcol' + (c % 2 ? " down" : "") + '" style="--d:' + d + 's"><div class="vcol-inner">' + spans + "</div></div>";
  }).join(""); });

  /* ---------- Use-case carousel ---------- */
  var cases = [
    ["Verifiable LLM inference over sensitive data", "AI", "Serve LLMs and other models in verifiable {env} so users can confirm the exact models and runtime that handled their prompts and data."],
    ["Verifiable oracles & data feeds", "Fintech", "Run oracle and pricing services in verifiable {env} to demonstrate the integrity of each price feed, signal, and the code that produces it."],
    ["Verifiable confidential AI for PHI", "Healthcare", "Prove that patient data never leaves a verified enclave, meeting HIPAA requirements with cryptographic evidence."],
    ["Verifiable model training pipelines", "AI", "Ensure training runs execute approved code on approved data, with attestation evidence for audit and compliance."],
    ["Verifiable custody & signing operations", "Fintech", "Show regulators and customers that key management and transaction signing happen only in attested, source-verified environments."],
    ["Verifiable nodes", "Blockchain", "Expose cryptographic proof that your full node binary matches the reviewed source and configuration."],
    ["Verifiable staking infrastructure", "Blockchain", "Give delegators and protocols independent proof that staking infrastructure is not forked, modified, or tampered with."]
  ];
  $$(".uc").forEach(function (section) {
    var carousel = $(".uc-carousel", section);
    if (!carousel) return;
    var where = section.dataset.where || "environments";
    $(".uc-track", section).innerHTML = cases.concat(cases).map(function (c, i) {
      return '<div class="uc-card"' + (i >= cases.length ? ' aria-hidden="true"' : "") + '><div class="uc-card-head"><h3>' +
        c[0].replace(/&/g, "&amp;") + '</h3><span class="badge">' + c[1] + "</span></div><p>" + c[2].replace("{env}", where) + "</p></div>";
    }).join("");

    var dragging = false, startX = 0, startScroll = 0;
    carousel.addEventListener("mousedown", function (e) {
      dragging = true; startX = e.clientX; startScroll = carousel.scrollLeft; carousel.classList.add("dragging");
    });
    window.addEventListener("mousemove", function (e) { if (dragging) carousel.scrollLeft = startScroll - (e.clientX - startX); });
    window.addEventListener("mouseup", function () { dragging = false; carousel.classList.remove("dragging"); });

    function jump(dir) {
      var cards = $$(".uc-card", carousel), step = cards[1].offsetLeft - cards[0].offsetLeft, half = step * cases.length;
      if (dir < 0 && carousel.scrollLeft < step) { carousel.style.scrollSnapType = "none"; carousel.scrollLeft += half; void carousel.offsetHeight; carousel.style.scrollSnapType = ""; }
      if (dir > 0 && carousel.scrollLeft >= half - step) { carousel.style.scrollSnapType = "none"; carousel.scrollLeft -= half; void carousel.offsetHeight; carousel.style.scrollSnapType = ""; }
      carousel.scrollBy({ left: dir * step, behavior: "smooth" });
    }
    $(".uc-arrow.prev", section).addEventListener("click", function () { jump(-1); });
    $(".uc-arrow.next", section).addEventListener("click", function () { jump(1); });
  });

  /* ---------- Typing terminals ---------- */
  var x = '<svg viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6"/></svg>';
  var terms = $$("[data-term]");
  terms.forEach(function (t) {
    t.innerHTML = '<div class="term-bar"><span></span><span></span><span>' + x + '</span></div><div class="term-body"></div>';
  });
  function typeTerm(t) {
    var lines = JSON.parse(t.dataset.term), body = $(".term-body", t), li = 0;
    body.innerHTML = "";
    function next() {
      if (li >= lines.length) { body.insertAdjacentHTML("beforeend", '<span class="prompt">$</span><span class="cursor"></span>'); return; }
      var line = lines[li++], div = document.createElement("div");
      body.appendChild(div);
      if (line.charAt(0) === "$") {
        div.innerHTML = '<span class="prompt">$</span><span class="cmd"></span><span class="cursor"></span>';
        var cmd = line.slice(2), k = 0, span = $(".cmd", div);
        (function type() {
          span.textContent = cmd.slice(0, ++k);
          if (k < cmd.length) setTimeout(type, 45 + Math.random() * 40);
          else { $(".cursor", div).remove(); setTimeout(next, 400); }
        })();
      } else {
        var ok = line.charAt(0) === "✓";
        div.className = ok ? "ok" : "out";
        div.textContent = line;
        setTimeout(next, ok ? 300 : 550);
      }
    }
    next();
  }
  var tio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { typeTerm(e.target); tio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  terms.forEach(function (t) { tio.observe(t); });

  /* ---------- FAQ ---------- */
  $$(".faq-item").forEach(function (item) {
    var q = $(".faq-q", item);
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open);
    });
  });

  /* ---------- Blog filters ---------- */
  $$("[data-filters]").forEach(function (bar) {
    var grid = bar.nextElementSibling;
    $$(".filter", bar).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        $$(".filter", bar).forEach(function (b) { b.classList.toggle("active", b === btn); });
        $$("[data-tag]", grid).forEach(function (c) { c.style.display = f === "all" || c.dataset.tag === f ? "" : "none"; });
      });
    });
  });

  /* ---------- Section nav highlighting (FAQ page, AWS page) ---------- */
  $$(".faq-nav, .toc").forEach(function (nav) {
    var links = $$("a", nav);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    links.forEach(function (a) {
      var target = document.getElementById(a.getAttribute("href").slice(1));
      if (target) spy.observe(target);
    });
  });
})();
