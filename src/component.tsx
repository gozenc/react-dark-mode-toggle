import * as React from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes, MouseEvent as ReactMouseEvent } from "react";
import STYLE_CSS from "./style.css?inline";

const { useEffect, useRef, useState, createElement: h, Fragment } = React;
const ENUM_className = "rdmt";
const ENUM_div = "div";
const ENUM_circle = "circle";
const ENUM_line = "line";
const ENUM_full = "100%";
const ENUM_null = 0;
const ENUM_currentColor = "currentColor";
const ENUM_defaultSize = 24;
const ENUM_beamEnd = 4.22;
const ENUM_beamStart = 5.64;
const ENUM_x1 = ENUM_defaultSize - ENUM_beamStart;
const ENUM_x2 = ENUM_defaultSize - ENUM_beamEnd;
const ENUM_halfSize = ENUM_defaultSize / 2;
const ENUM_quarter = ENUM_defaultSize / 4;

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
    if (
      !hostRef.current ||
      shadowRoot ||
      typeof hostRef.current.attachShadow !== "function"
    ) {
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
  const appliedSize = styleVariables["--rdmt-size"] ?? size ?? ENUM_defaultSize;

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
          h("style", null, STYLE_CSS),
          h(
            ENUM_div,
            {
              className: ENUM_className,
              style: styleVariables,
              onClick: handleToggle,
            },
            h(
              ENUM_div,
              {
                className: `${ENUM_className}t`, // toggle
                title: "Toggles light & dark",
                "aria-label": "auto",
                "aria-live": "polite",
              },
              h(
                "svg",
                {
                  className: `${ENUM_className}sm`, // sun and moon
                  "aria-hidden": "true",
                  width: appliedSize,
                  height: appliedSize,
                  viewBox: `${ENUM_null} ${ENUM_null} ${ENUM_defaultSize} ${ENUM_defaultSize}`,
                },
                h(ENUM_circle, {
                  className: `${ENUM_className}s`, // sun
                  cx: ENUM_halfSize,
                  cy: ENUM_halfSize,
                  r: ENUM_quarter,
                  mask: `url(#${ENUM_className}mm)`, // moon mask
                  fill: ENUM_currentColor,
                }),
                h(
                  "g",
                  {
                    className: `${ENUM_className}b`, // beams
                    stroke: ENUM_currentColor,
                  },
                  h(ENUM_line, {
                    x1: ENUM_halfSize,
                    y1: "1",
                    x2: ENUM_halfSize,
                    y2: "3",
                  }),
                  h(ENUM_line, {
                    x1: ENUM_halfSize,
                    y1: ENUM_defaultSize - 3,
                    x2: ENUM_halfSize,
                    y2: ENUM_defaultSize - 1,
                  }),
                  h(ENUM_line, {
                    x1: ENUM_beamEnd,
                    y1: ENUM_beamEnd,
                    x2: ENUM_beamStart,
                    y2: ENUM_beamStart,
                  }),
                  h(ENUM_line, {
                    x1: ENUM_x1,
                    y1: ENUM_x1,
                    x2: ENUM_x2,
                    y2: ENUM_x2,
                  }),
                  h(ENUM_line, {
                    x1: "1",
                    y1: ENUM_halfSize,
                    x2: "3",
                    y2: ENUM_halfSize,
                  }),
                  h(ENUM_line, {
                    x1: ENUM_defaultSize - 3,
                    y1: ENUM_halfSize,
                    x2: ENUM_defaultSize - 1,
                    y2: ENUM_halfSize,
                  }),
                  h(ENUM_line, {
                    x1: ENUM_beamEnd,
                    y1: ENUM_x2,
                    x2: ENUM_beamStart,
                    y2: ENUM_x1,
                  }),
                  h(ENUM_line, {
                    x1: ENUM_x1,
                    y1: ENUM_beamStart,
                    x2: ENUM_x2,
                    y2: ENUM_beamEnd,
                  })
                ),
                h(
                  "mask",
                  {
                    className: `${ENUM_className}m`, // moon
                    id: `${ENUM_className}mm`, // moon mask
                  },
                  h("rect", {
                    x: ENUM_null,
                    y: ENUM_null,
                    width: ENUM_full,
                    height: ENUM_full,
                    fill: "white",
                  }),
                  h(ENUM_circle, {
                    cx: ENUM_defaultSize,
                    cy: ENUM_halfSize - 2,
                    r: ENUM_quarter,
                    fill: "black",
                  })
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
