import * as T from "react";
import { createPortal as j } from "react-dom";
const { useEffect: B, useRef: F, useState: I, createElement: r, Fragment: K } = T, a = "rdmt", z = "circle", s = "line", w = "100%", $ = "currentColor", C = 24, l = 4.22, u = 5.64, f = 18.36, h = 19.78, e = 12;
function q(g) {
  const { className: D, colors: N, onClick: v, onModeChange: S, size: k, padding: H, radius: E, localStorageKey: L, ...M } = g, m = F(null), [c, R] = I(null);
  B(() => {
    if (!m.current || c || typeof m.current.attachShadow != "function") return;
    const d = m.current.shadowRoot ?? m.current.attachShadow({ mode: "open" });
    R(d);
  }, [c]);
  const x = (function(d, n, i, t) {
    const o = {}, b = typeof d == "number" ? `${d}px` : d, y = typeof i == "number" ? `${i}px` : i;
    return n && (o["--rdmtr"] = n), t?.backgroundColor && (o["--rdmtbgl"] = t.backgroundColor), t?.backgroundColorDark && (o["--rdmtbgd"] = t.backgroundColorDark), t?.color && (o["--rdmtcl"] = t.color), t?.colorDark && (o["--rdmtcd"] = t.colorDark), t?.colorHover && (o["--rdmtchl"] = t.colorHover), t?.colorHoverDark && (o["--rdmtchd"] = t.colorHoverDark), y && (o["--rdmts"] = y), b && (o["--rdmtp"] = b), o;
  })(H, E, k, N), p = x["--rdmts"] ?? k ?? C;
  return r("span", { ref: m, className: D, ...M }, c && j(r(K, null, r("style", null, ":host{--rdmts: 24px;--rdmtp: calc(var(--rdmts) / 3);--rdmtbgl: #f3f4f6;--rdmtbgd: #3e3e42;--rdmtr: 100%;--rdmtcl: #9aa0a6;--rdmtcd: #d5d5d5ff;--rdmtchl: #000000;--rdmtchd: #ffffff;--rdmtei: cubic-bezier(.25, 0, .3, 1);--rdmtee1: cubic-bezier(.5, 1.25, .75, 1.25);--rdmtee2: cubic-bezier(.5, 1.5, .75, 1.25);--rdmteo: cubic-bezier(0, 0, 0, 1)}.rdmt{--rdmtif: var(--rdmtcl);--rdmtif-hover: var(--rdmtchl);display:inline-flex;justify-items:center;padding:var(--rdmtp);border-radius:var(--rdmtr);height:var(--rdmts);width:var(--rdmts);cursor:pointer;align-items:center;background-color:var(--rdmtbgl)}:host-context(.dark) .rdmt{background-color:var(--rdmtbgd)}.rdmtt{background:none;border:none;padding:0;inline-size:var(--rdmts);block-size:var(--rdmts);aspect-ratio:1;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;outline-offset:5px}.rdmtt>svg{inline-size:100%;block-size:100%;stroke-linecap:round}:host-context(.dark) .rdmtt{--rdmtif: var(--rdmtcd);--rdmtif-hover: var(--rdmtchd)}.rdmts{transition:transform .5s var(--rdmtee1)}.rdmtsm>:is(.rdmtm,.rdmts,.rdmtb){transform-origin:center center}.rdmtsm>:is(.rdmtm,.rdmts){fill:var(--rdmtif)}.rdmtt:is(:hover,:focus-visible)>.rdmtsm>:is(.rdmtm,.rdmts){fill:var(--rdmtif-hover)}.rdmtsm>.rdmtb{stroke:var(--rdmtif);stroke-width:2px}.rdmtt:is(:hover,:focus-visible) .rdmtsm>.rdmtb{stroke:var(--rdmtif-hover)}:host-context(.dark) .rdmtsm>.rdmts{transform:scale(1.5)}:host-context(.dark) .rdmtsm>.rdmtb{opacity:0}:host-context(.dark) .rdmtsm>.rdmtm>circle{transform:translate(-7px);transition:transform .25s var(--rdmteo)}@supports (cx: 1){:host-context(.dark) .rdmtsm>.rdmtm>circle{transform:translate(0);cx:17;transition:cx .25s var(--rdmteo)}}@media (prefers-reduced-motion: no-preference){.rdmtsm>.rdmts{transition:transform .5s var(--rdmtee1)}.rdmtsm>.rdmtb{transition:transform .5s var(--rdmtee2),opacity .5s var(--rdmtei)}.rdmtsm .rdmtm>circle{transform:translate(-7px);transition:transform .25s var(--rdmteo)}@supports (cx: 1){.rdmtsm .rdmtm>circle{transform:translate(0);transition:cx .25s var(--rdmteo)}}:host-context(.dark) .rdmtsm>.rdmts{transform:scale(1.5);transition-timing-function:var(--rdmtei);transition-duration:.25s}:host-context(.dark) .rdmtsm>.rdmtb{transform:rotate(-25deg);transition-duration:.15s}:host-context(.dark) .rdmtsm>.rdmtm>circle{transition-delay:.15s;transition-duration:.25s}}"), r("div", { className: a, style: x, onClick: function(d) {
    g.preventDefault === !0 || (function() {
      if (typeof document < "u") {
        const n = document.documentElement, i = n.classList.contains("dark") ? "light" : "dark";
        n.classList.toggle("dark", i === "dark"), typeof window < "u" && window.localStorage.setItem(L ?? "color-theme", i), S?.(i);
      }
    })(), v && v(d);
  } }, r("div", { className: `${a}t`, title: "Toggles light & dark", "aria-label": "auto", "aria-live": "polite" }, r("svg", { className: `${a}sm`, "aria-hidden": "true", width: p, height: p, viewBox: "0 0 24 24" }, r(z, { className: `${a}s`, cx: e, cy: e, r: 6, mask: `url(#${a}mm)`, fill: $ }), r("g", { className: `${a}b`, stroke: $ }, r(s, { x1: e, y1: "1", x2: e, y2: "3" }), r(s, { x1: e, y1: 21, x2: e, y2: 23 }), r(s, { x1: l, y1: l, x2: u, y2: u }), r(s, { x1: f, y1: f, x2: h, y2: h }), r(s, { x1: "1", y1: e, x2: "3", y2: e }), r(s, { x1: 21, y1: e, x2: 23, y2: e }), r(s, { x1: l, y1: h, x2: u, y2: f }), r(s, { x1: f, y1: u, x2: h, y2: l })), r("mask", { className: `${a}m`, id: `${a}mm` }, r("rect", { x: 0, y: 0, width: w, height: w, fill: "white" }), r(z, { cx: C, cy: 10, r: 6, fill: "black" })))))), c));
}
export {
  q as DarkModeToggle,
  q as default
};
