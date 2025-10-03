import * as React from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes, MouseEvent as ReactMouseEvent } from "react";

const { useEffect, useRef, useState, createElement: h, Fragment } = React;

const STYLE_TEXT = `
:host {
  display: inline-flex;
  --rdmt-size: 24px;
  --rdmt-padding: calc(var(--rdmt-size) / 3);
  --rdmt-bg-light: #f3f4f6;
  --rdmt-bg-dark: #3e3e42;
  --rdmt-color-light: #9aa0a6;
  --rdmt-color-dark: #d5d5d5ff;
  --rdmt-color-hover-light: #000000;
  --rdmt-color-hover-dark: #ffffff;
}
.rdmt {
  display: inline-flex;
  justify-items: center;
  padding: var(--rdmt-padding);
  border-radius: 100%;
  height: var(--rdmt-size);
  width: var(--rdmt-size);
  cursor: pointer;
  align-items: center;
  background-color: var(--rdmt-bg-light);
  transition: background-color 0.2s ease-in-out;
}
:host-context(.dark) .rdmt {
  background-color: var(--rdmt-bg-dark);
}
.rdmt_t {
  --ease-1: cubic-bezier(0.25, 0, 0.5, 1);
  --ease-2: cubic-bezier(0.25, 0, 0.4, 1);
  --ease-3: cubic-bezier(0.25, 0, 0.3, 1);
  --ease-4: cubic-bezier(0.25, 0, 0.2, 1);
  --ease-5: cubic-bezier(0.25, 0, 0.1, 1);
  --ease-in-1: cubic-bezier(0.25, 0, 1, 1);
  --ease-in-2: cubic-bezier(0.5, 0, 1, 1);
  --ease-in-3: cubic-bezier(0.7, 0, 1, 1);
  --ease-in-4: cubic-bezier(0.9, 0, 1, 1);
  --ease-in-5: cubic-bezier(1, 0, 1, 1);
  --ease-out-1: cubic-bezier(0, 0, 0.75, 1);
  --ease-out-2: cubic-bezier(0, 0, 0.5, 1);
  --ease-out-3: cubic-bezier(0, 0, 0.3, 1);
  --ease-out-4: cubic-bezier(0, 0, 0.1, 1);
  --ease-out-5: cubic-bezier(0, 0, 0, 1);
  --ease-in-out-1: cubic-bezier(0.1, 0, 0.9, 1);
  --ease-in-out-2: cubic-bezier(0.3, 0, 0.7, 1);
  --ease-in-out-3: cubic-bezier(0.5, 0, 0.5, 1);
  --ease-in-out-4: cubic-bezier(0.7, 0, 0.3, 1);
  --ease-in-out-5: cubic-bezier(0.9, 0, 0.1, 1);
  --ease-elastic-1: cubic-bezier(0.5, 0.75, 0.75, 1.25);
  --ease-elastic-2: cubic-bezier(0.5, 1, 0.75, 1.25);
  --ease-elastic-3: cubic-bezier(0.5, 1.25, 0.75, 1.25);
  --ease-elastic-4: cubic-bezier(0.5, 1.5, 0.75, 1.25);
  --ease-elastic-5: cubic-bezier(0.5, 1.75, 0.75, 1.25);
  --ease-squish-1: cubic-bezier(0.5, -0.1, 0.1, 1.5);
  --ease-squish-2: cubic-bezier(0.5, -0.3, 0.1, 1.5);
  --ease-squish-3: cubic-bezier(0.5, -0.5, 0.1, 1.5);
  --ease-squish-4: cubic-bezier(0.5, -0.7, 0.1, 1.5);
  --ease-squish-5: cubic-bezier(0.5, -0.9, 0.1, 1.5);
  --ease-step-1: steps(2);
  --ease-step-2: steps(3);
  --ease-step-3: steps(4);
  --ease-step-4: steps(7);
  --ease-step-5: steps(10);
  --icon-fill: var(--rdmt-color-light);
  --icon-fill-hover: var(--rdmt-color-hover-light);
  background: none;
  border: none;
  padding: 0;
  inline-size: var(--rdmt-size);
  block-size: var(--rdmt-size);
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: 5px;
}
.rdmt_t > svg {
  inline-size: 100%;
  block-size: 100%;
  stroke-linecap: round;
}
:host-context(.dark) .rdmt_t {
  --icon-fill: var(--rdmt-color-dark);
  --icon-fill-hover: var(--rdmt-color-hover-dark);
}
.rdmt_s {
  transition: transform 0.5s var(--ease-elastic-3);
}
.rdmt_sm > :is(.rdmt_m, .rdmt_s, .rdmt_b) {
  transform-origin: center center;
}
.rdmt_sm > :is(.rdmt_m, .rdmt_s) {
  fill: var(--icon-fill);
}
.rdmt_t:is(:hover, :focus-visible) > .rdmt_sm > :is(.rdmt_m, .rdmt_s) {
  fill: var(--icon-fill-hover);
}
.rdmt_sm > .rdmt_b {
  stroke: var(--icon-fill);
  stroke-width: 2px;
}
.rdmt_t:is(:hover, :focus-visible) .rdmt_sm > .rdmt_b {
  stroke: var(--icon-fill-hover);
}
:host-context(.dark) .rdmt_sm > .rdmt_s {
  transform: scale(1.5);
}
:host-context(.dark) .rdmt_sm > .rdmt_b {
  opacity: 0;
}
:host-context(.dark) .rdmt_sm > .rdmt_m > circle {
  transform: translateX(-7px);
  transition: transform 0.25s var(--ease-out-5);
}
@supports (cx: 1) {
  :host-context(.dark) .rdmt_sm > .rdmt_m > circle {
    transform: translateX(0);
    cx: 17;
    transition: cx 0.25s var(--ease-out-5);
  }
}
@media (prefers-reduced-motion: no-preference) {
  .rdmt_sm > .rdmt_s {
    transition: transform 0.5s var(--ease-elastic-3);
  }
  .rdmt_sm > .rdmt_b {
    transition: transform 0.5s var(--ease-elastic-4), opacity 0.5s var(--ease-3);
  }
  .rdmt_sm .rdmt_m > circle {
    transform: translateX(-7px);
    transition: transform 0.25s var(--ease-out-5);
  }
  @supports (cx: 1) {
    .rdmt_sm .rdmt_m > circle {
      transform: translateX(0);
      transition: cx 0.25s var(--ease-out-5);
    }
  }
  :host-context(.dark) .rdmt_sm > .rdmt_s {
    transform: scale(1.5);
    transition-timing-function: var(--ease-3);
    transition-duration: 0.25s;
  }
  :host-context(.dark) .rdmt_sm > .rdmt_b {
    transform: rotateZ(-25deg);
    transition-duration: 0.15s;
  }
  :host-context(.dark) .rdmt_sm > .rdmt_m > circle {
    transition-delay: 0.15s;
    transition-duration: 0.25s;
  }
}
`;

export interface DarkModeToggleProps extends HTMLAttributes<HTMLSpanElement> {
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void;
  onModeChange?: (mode: ModeName) => void;
  size?: number | string;
  padding?: number | string;
  preventDefault?: boolean;
  localStorageKey?: string;
  colors?: {
    backgroundColor?: string;
    backgroundColorDark?: string;
    backgroundColorHover?: string;
    backgroundColorHoverDark?: string;
    color?: string;
    colorDark?: string;
    colorHover?: string;
    colorHoverDark?: string;
  };
}

type ModeName = "light" | "dark";

export function DarkModeToggle(props: DarkModeToggleProps) {
  const {
    className,
    colors,
    onClick,
    onModeChange,
    size,
    padding,
    localStorageKey,
    ...spanProps
  } = props;
  const hostRef = useRef<HTMLSpanElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (!hostRef.current || shadowRoot) {
      return;
    }

    if (typeof hostRef.current.attachShadow !== "function") {
      return;
    }

    const root =
      hostRef.current.shadowRoot ??
      hostRef.current.attachShadow({
        mode: "open",
      });
    setShadowRoot(root);
  }, [shadowRoot]);

  const styleVariables = makeStyleVariables(padding, size, colors);
  const appliedSize = styleVariables["--rdmt-size"] ?? size ?? 24;

  function handleToggle(event: ReactMouseEvent<HTMLDivElement>) {
    if (props.preventDefault === true) {
      void 0;
    } else {
      defaultOnClickBehavior();
    }
    if (onClick) {
      onClick(event as unknown as ReactMouseEvent<HTMLSpanElement>);
    }
  }

  function defaultOnClickBehavior() {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      const isDark = root.classList.contains("dark");
      const nextTheme: ModeName = isDark ? "light" : "dark";
      root.classList.toggle("dark", nextTheme === "dark");
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          localStorageKey ?? "color-theme",
          nextTheme
        );
      }
      onModeChange?.(nextTheme);
    }
  }

  return h(
    "span",
    { ref: hostRef, className, ...spanProps },
    shadowRoot &&
      createPortal(
        h(
          Fragment,
          null,
          h("style", null, STYLE_TEXT),
          h(
            "div",
            { className: "rdmt", style: styleVariables, onClick: handleToggle },
            h(
              "div",
              {
                className: "rdmt_t",
                title: "Toggles light & dark",
                "aria-label": "auto",
                "aria-live": "polite",
              },
              h(
                "svg",
                {
                  className: "rdmt_sm",
                  "aria-hidden": "true",
                  width: appliedSize,
                  height: appliedSize,
                  viewBox: "0 0 24 24",
                },
                h("circle", {
                  className: "rdmt_s",
                  cx: "12",
                  cy: "12",
                  r: "6",
                  mask: "url(#rdmt_m_m)",
                  fill: "currentColor",
                }),
                h(
                  "g",
                  { className: "rdmt_b", stroke: "currentColor" },
                  h("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
                  h("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
                  h("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
                  h("line", {
                    x1: "18.36",
                    y1: "18.36",
                    x2: "19.78",
                    y2: "19.78",
                  }),
                  h("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
                  h("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
                  h("line", {
                    x1: "4.22",
                    y1: "19.78",
                    x2: "5.64",
                    y2: "18.36",
                  }),
                  h("line", {
                    x1: "18.36",
                    y1: "5.64",
                    x2: "19.78",
                    y2: "4.22",
                  })
                ),
                h(
                  "mask",
                  { className: "rdmt_m", id: "rdmt_m_m" },
                  h("rect", {
                    x: "0",
                    y: "0",
                    width: "100%",
                    height: "100%",
                    fill: "white",
                  }),
                  h("circle", { cx: "24", cy: "10", r: "6", fill: "black" })
                )
              )
            )
          )
        ),
        shadowRoot
      )
  );
}

function makeStyleVariables(
  padding: number | string | undefined,
  size: number | string | undefined,
  colors: DarkModeToggleProps["colors"]
) {
  const styleVariables = {} as Record<string, string>;

  const resolvedPadding =
    typeof padding === "number" ? `${padding}px` : padding;
  const resolvedSize = typeof size === "number" ? `${size}px` : size;

  if (colors?.backgroundColor) {
    styleVariables["--rdmt-bg-light"] = colors.backgroundColor;
  }
  if (colors?.backgroundColorDark) {
    styleVariables["--rdmt-bg-dark"] = colors.backgroundColorDark;
  }
  if (colors?.color) {
    styleVariables["--rdmt-color-light"] = colors.color;
  }
  if (colors?.colorDark) {
    styleVariables["--rdmt-color-dark"] = colors.colorDark;
  }
  if (colors?.colorHover) {
    styleVariables["--rdmt-color-hover-light"] = colors.colorHover;
  }
  if (colors?.colorHoverDark) {
    styleVariables["--rdmt-color-hover-dark"] = colors.colorHoverDark;
  }
  if (resolvedSize) {
    styleVariables["--rdmt-size"] = resolvedSize;
  }
  if (resolvedPadding) {
    styleVariables["--rdmt-padding"] = resolvedPadding;
  }

  return styleVariables;
}
