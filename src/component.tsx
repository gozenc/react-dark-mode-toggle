import * as React from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes, MouseEvent as ReactMouseEvent } from "react";
import STYLE_TEXT from "./style.css?inline";

const { useEffect, useRef, useState, createElement: h, Fragment } = React;
export interface DarkModeToggleProps extends HTMLAttributes<HTMLSpanElement> {
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void;
  onModeChange?: (mode: ModeName) => void;
  size?: number | string;
  radius?: string;
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
    radius,
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

  const styleVariables = makeStyleVariables(padding, radius, size, colors);
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
  radius: string | undefined,
  size: number | string | undefined,
  colors: DarkModeToggleProps["colors"]
) {
  const styleVariables = {} as Record<string, string>;

  const resolvedPadding =
    typeof padding === "number" ? `${padding}px` : padding;
  const resolvedSize = typeof size === "number" ? `${size}px` : size;

  if (radius) {
    styleVariables["--rdmt-radius"] = radius;
  }
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
