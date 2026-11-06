(function () {
  "use strict";
  const S = window.SITE;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));

  // ---------------------------------------------------------- avatar (falls back to initials if no photo yet)
  const initials = S.name.split(" ").map((w) => w[0]).join("");
  const fallback = "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset=".5" stop-color="#22d3ee"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><rect width="200" height="200" fill="#121218"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Outfit,Arial" font-weight="700" font-size="72" fill="url(#g)">${initials}</text></svg>`);
  const avatar = $("#avatar");
  avatar.onerror = () => { avatar.onerror = null; avatar.src = fallback; };
  avatar.src = S.photo;

  // ---------------------------------------------------------- hero
  $("#heroName").textContent = S.name;
  $("#heroRole").textContent = S.role;
  $("#heroTagline").textContent = S.tagline;
  $("#heroBadges").innerHTML = S.badges.map((b) => `<span class="badge">${esc(b)}</span>`).join("");
  // Resume: an external link (e.g. Google Drive) opens in a new tab; a local file downloads.
  const resumeIsLink = /^https?:\/\//.test(S.resume);
  ["#heroResume", "#navResume"].forEach((id) => { $(id).href = S.resume; });
  if (resumeIsLink) {
    $("#heroResume").removeAttribute("download");
    $("#heroResume").innerHTML = `<i data-icon="file"></i><span>View Resume</span>`;
  }

  const socialsHTML = `
    <a class="social" href="${S.socials.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
    <a class="social" href="${S.socials.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
    <a class="social" href="mailto:${S.socials.email}" aria-label="Email">${icon("mail")}</a>
    <a class="social" href="${S.resume}" target="_blank" rel="noopener" aria-label="Resume">${icon("file")}</a>`;
  $("#heroSocials").innerHTML = socialsHTML;
  $("#contactSocials").innerHTML = socialsHTML;

  // ---------------------------------------------------------- about
  $("#aboutText").innerHTML = S.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#aboutCards").innerHTML = S.about.highlights.map((h, i) => `
    <div class="card mini reveal" style="--d:${i * 0.08}s">
      <div class="icon-box">${icon(h.icon)}</div>
      <div><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>
    </div>`).join("");

  // ---------------------------------------------------------- skills
  $("#skillsGrid").innerHTML = S.skills.map((g, i) => `
    <div class="card skill-card reveal" style="--d:${i * 0.1}s">
      <div class="icon-box">${icon(g.icon)}</div>
      <h3>${esc(g.title)}</h3>
      <div class="chips">${g.items.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
    </div>`).join("");

  // ---------------------------------------------------------- projects
  $("#projectsGrid").innerHTML = S.projects.map((p, i) => {
    const preview = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy">`
      : `<div class="big-icon">${icon(p.icon || "code", 34)}</div>`;
    const gh = p.github
      ? `<a class="btn btn-sm btn-ghost" href="${esc(p.github)}" target="_blank" rel="noopener">${icon("github", 16)}<span>GitHub</span></a>` : "";
    const demo = p.demo
      ? `<a class="btn btn-sm btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener">${icon("external", 16)}<span>Live Demo</span></a>` : "";
    return `
    <article class="card project reveal" style="--d:${(i % 2) * 0.1}s">
      <div class="preview">${p.demo ? `<span class="tag-demo live">● Live</span>` : ""}${preview}</div>
      <div class="project-body">
        ${p.meta ? `<span class="project-meta">${esc(p.meta)}</span>` : ""}
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        ${gh || demo ? `<div class="project-links">${gh}${demo}</div>` : ""}
      </div>
    </article>`;
  }).join("");

  // ---------------------------------------------------------- experience
  $("#timeline").innerHTML = S.experience.map((e, i) => `
    <div class="card t-item reveal" style="--d:${i * 0.08}s">
      <span class="dot"></span>
      <div class="t-top">
        <div class="icon-box">${icon(e.icon || "sparkles")}</div>
        <div><h3>${esc(e.title)}</h3><div class="t-org">${esc(e.org)}</div></div>
        ${e.period ? `<span class="t-period">${esc(e.period)}</span>` : ""}
      </div>
      <p>${esc(e.text)}</p>
    </div>`).join("");

  // ---------------------------------------------------------- contact / footer
  const email = S.socials.email;
  const emailLink = $("#emailLink");
  emailLink.textContent = email;
  emailLink.href = "mailto:" + email;
  $("#year").textContent = new Date().getFullYear();

  const toast = $("#toast");
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("show"), 2200);
  }
  const copyBtn = $("#copyBtn");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = email; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
    copyBtn.classList.add("copied");
    copyBtn.innerHTML = `${icon("check")}<span>Copied</span>`;
    showToast("Email copied to clipboard ✓");
    setTimeout(() => { copyBtn.classList.remove("copied"); copyBtn.innerHTML = `${icon("copy")}<span>Copy</span>`; }, 2000);
  });

  // ---------------------------------------------------------- static icons in markup
  document.querySelectorAll("i[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon, 18); });

  // ---------------------------------------------------------- nav: scrolled state, active link, mobile menu
  const nav = $("#nav");
  const links = [...document.querySelectorAll(".nav-links a")];
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  menuBtn.innerHTML = icon("menu", 24);
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.innerHTML = icon(open ? "close" : "menu", 24);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.forEach((a) => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.innerHTML = icon("menu", 24);
  }));
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const sections = ["about", "skills", "projects", "experience", "contact"].map((id) => document.getElementById(id));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  // ---------------------------------------------------------- reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---------------------------------------------------------- glow that follows the cursor on cards
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", (e.clientX - r.left) + "px");
    card.style.setProperty("--y", (e.clientY - r.top) + "px");
  });

  // ---------------------------------------------------------- floating particles
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = $("#particles");
  const ctx = canvas.getContext("2d");
  let W, H, dots = [];
  const mouse = { x: -9999, y: -9999 };
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(70, (W * H) / 22000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4, hue: Math.random() < 0.5 ? "59,130,246" : (Math.random() < 0.5 ? "34,211,238" : "168,85,247")
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < dots.length; i++) {
      const p = dots[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dmx = p.x - mouse.x, dmy = p.y - mouse.y, dm = Math.hypot(dmx, dmy);
      if (dm < 120) { p.x += dmx / dm * 0.6; p.y += dmy / dm * 0.6; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},.7)`; ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const q = dots[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(${p.hue},${(1 - d / 130) * 0.18})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  resize();
  draw();
})();
