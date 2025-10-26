import { createElement as r, Fragment as S } from "react";
const e = "rdmt", x = "circle", i = "line", y = "100%", z = "currentColor", C = 24, c = 4.22, u = 5.64, f = 18.36, g = 19.78, a = 12;
function j(d) {
  const { className: v, darkClassName: $, wrapperClassName: w, colors: N, onClick: k, onModeChange: D, size: p, padding: E, rootElement: H, radius: B, localStorageKey: I, ...L } = d, M = (function(n, m, l, t) {
    const o = {}, s = typeof m == "number" ? `${m}px` : m, b = typeof n == "number" ? `${n}px` : n;
    return l && (o["--rdmtr"] = l), t?.backgroundColor && (o["--rdmtbgl"] = t.backgroundColor), t?.backgroundColorDark && (o["--rdmtbgd"] = t.backgroundColorDark), t?.color && (o["--rdmtcl"] = t.color), t?.colorDark && (o["--rdmtcd"] = t.colorDark), t?.colorHover && (o["--rdmtchl"] = t.colorHover), t?.colorHoverDark && (o["--rdmtchd"] = t.colorHoverDark), b && (o["--rdmts"] = b), s && (o["--rdmtp"] = s), o;
  })(p, E, B, N), h = p ?? C;
  return r("span", { className: w, ...L }, r(S, null, r("div", { className: `${e}${v ? ` ${v}` : ""}`, style: M, onClick: function(n) {
    d.preventDefault !== !0 && (function(m, l = document.documentElement, t = "color-theme", o = "dark") {
      if (typeof document < "u") {
        const s = l.classList.contains(o) ? "light" : "dark";
        l.classList.toggle(o, s === o), typeof window < "u" && window.localStorage.setItem(t, s), m?.(s);
      }
    })(D, H, I, $), k && k(n);
  } }, r("div", { className: `${e}t`, title: "Toggles light & dark", "aria-label": "auto", "aria-live": "polite" }, r("svg", { className: `${e}sm`, "aria-hidden": "true", width: h, height: h, viewBox: "0 0 24 24" }, r(x, { className: `${e}s`, cx: a, cy: a, r: 6, mask: `url(#${e}mm)`, fill: z }), r("g", { className: `${e}b`, stroke: z }, r(i, { x1: a, y1: "1", x2: a, y2: "3" }), r(i, { x1: a, y1: 21, x2: a, y2: 23 }), r(i, { x1: c, y1: c, x2: u, y2: u }), r(i, { x1: f, y1: f, x2: g, y2: g }), r(i, { x1: "1", y1: a, x2: "3", y2: a }), r(i, { x1: 21, y1: a, x2: 23, y2: a }), r(i, { x1: c, y1: g, x2: u, y2: f }), r(i, { x1: f, y1: u, x2: g, y2: c })), r("mask", { className: `${e}m`, id: `${e}mm` }, r("rect", { x: 0, y: 0, width: y, height: y, fill: "white" }), r(x, { cx: C, cy: 10, r: 6, fill: "black" })))))));
}
(function() {
  if (typeof document > "u" || document.getElementById(e)) return;
  const d = document.createElement("style");
  d.id = e, d.textContent = ".rdmt{--rdmts: 24px;--rdmtp: calc(var(--rdmts) / 4);--rdmtbgl: #f3f4f6;--rdmtbgd: #3e3e42;--rdmtr: 100%;--rdmtcl: #9aa0a6;--rdmtcd: #d5d5d5ff;--rdmtchl: #000000;--rdmtchd: #ffffff;--rdmtei: cubic-bezier(.25, 0, .3, 1);--rdmtee1: cubic-bezier(.5, 1.25, .75, 1.25);--rdmtee2: cubic-bezier(.5, 1.5, .75, 1.25);--rdmteo: cubic-bezier(0, 0, 0, 1);--rdmtif: var(--rdmtcl);--rdmtif-hover: var(--rdmtchl);display:inline-flex;justify-content:center;padding:var(--rdmtp);border-radius:var(--rdmtr);cursor:pointer;align-items:center;background-color:var(--rdmtbgl)}.dark .rdmt{background-color:var(--rdmtbgd)}.rdmtt{background:none;border:none;padding:0;inline-size:var(--rdmts);block-size:var(--rdmts);aspect-ratio:1;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;outline-offset:5px}.rdmtt>svg{inline-size:100%;block-size:100%;stroke-linecap:round}.dark .rdmtt{--rdmtif: var(--rdmtcd);--rdmtif-hover: var(--rdmtchd)}.rdmts{transition:transform .5s var(--rdmtee1)}.rdmtsm>:is(.rdmtm,.rdmts,.rdmtb){transform-origin:center center}.rdmtsm>:is(.rdmtm,.rdmts){fill:var(--rdmtif)}.rdmtt:is(:hover,:focus-visible)>.rdmtsm>:is(.rdmtm,.rdmts){fill:var(--rdmtif-hover)}.rdmtsm>.rdmtb{stroke:var(--rdmtif);stroke-width:2px;transition:transform .5s var(--rdmtee2),opacity .5s var(--rdmtei)}.rdmtt:is(:hover,:focus-visible) .rdmtsm>.rdmtb{stroke:var(--rdmtif-hover)}.rdmtsm .rdmtm>circle{transform:translate(-7px);transition:transform .25s var(--rdmteo)}@supports (cx: 1){.rdmtsm .rdmtm>circle{transform:translate(0);transition:cx .25s var(--rdmteo)}}.dark .rdmtsm>.rdmts{transform:scale(1.5);transition-timing-function:var(--rdmtei);transition-duration:.25s}.dark .rdmtsm>.rdmtb{opacity:0;transform:rotate(-25deg);transition-duration:.15s}.dark .rdmtsm>.rdmtm>circle{transform:translate(-7px);transition:transform .25s var(--rdmteo);transition-delay:.15s;transition-duration:.25s}@supports (cx: 1){.dark .rdmtsm>.rdmtm>circle{transform:translate(0);cx:17;transition:cx .25s var(--rdmteo);transition-delay:.15s;transition-duration:.25s}}", document.head.appendChild(d);
})();
export {
  j as DarkModeToggle,
  j as default
};
