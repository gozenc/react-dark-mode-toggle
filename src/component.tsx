import { Fragment, createElement as h } from "react";
import type { HTMLAttributes, MouseEvent as ReactMouseEvent } from "react";
import STYLE_CSS from "./style.css?inline";

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

function injectRdmtStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(ENUM_className)) return;
  const styleElement = document.createElement("style");
  styleElement.id = ENUM_className;
  styleElement.textContent = STYLE_CSS;
  document.head.appendChild(styleElement);
}

// Inject styles immediately when module loads
injectRdmtStyles();

export interface DarkModeToggleProps extends HTMLAttributes<HTMLSpanElement> {
  onClick?: (event: ReactMouseEvent<HTMLSpanElement>) => void;
  onModeChange?: (mode: ModeName) => void;
  size?: number | string;
  radius?: string;
  padding?: number | string;
  preventDefault?: boolean;
  localStorageKey?: string;
  rootElement?: HTMLElement;
  wrapperClassName?: string;
  darkClassName?: string;
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
    darkClassName,
    wrapperClassName,
    colors,
    onClick,
    onModeChange,
    size,
    padding,
    rootElement,
    radius,
    localStorageKey,
    ...spanProps
  } = props;

  const styleVariables = buildStyleVariables(size, padding, radius, colors);
  const appliedSize = size ?? ENUM_defaultSize;

  function handleToggle(event: ReactMouseEvent<HTMLDivElement>) {
    if (props.preventDefault !== true) {
      toggleDarkMode(onModeChange, rootElement, localStorageKey, darkClassName);
    }
    if (onClick) {
      onClick(event as unknown as ReactMouseEvent<HTMLSpanElement>);
    }
  }

  return h(
    "span",
    { className: wrapperClassName, ...spanProps },
    h(
      Fragment,
      null,
      h(
        ENUM_div,
        {
          className: `${ENUM_className}${className ? ` ${className}` : ""}`,
          style: styleVariables,
          onClick: handleToggle,
        },
        h(
          ENUM_div,
          {
            className: `${ENUM_className}t`,
            title: "Toggles light & dark",
            "aria-label": "auto",
            "aria-live": "polite",
          },
          h(
            "svg",
            {
              className: `${ENUM_className}sm`,
              "aria-hidden": "true",
              width: appliedSize,
              height: appliedSize,
              viewBox: `${ENUM_null} ${ENUM_null} ${ENUM_defaultSize} ${ENUM_defaultSize}`,
            },
            h(ENUM_circle, {
              className: `${ENUM_className}s`,
              cx: ENUM_halfSize,
              cy: ENUM_halfSize,
              r: ENUM_quarter,
              mask: `url(#${ENUM_className}mm)`,
              fill: ENUM_currentColor,
            }),
            h(
              "g",
              {
                className: `${ENUM_className}b`,
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
                className: `${ENUM_className}m`,
                id: `${ENUM_className}mm`,
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
    )
  );
}

function buildStyleVariables(
  size: number | string | undefined,
  padding: number | string | undefined,
  radius: string | undefined,
  colors: DarkModeToggleProps["colors"]
) {
  const styleVariables = {} as Record<string, string>;
  const resolvedPadding =
    typeof padding === "number" ? `${padding}px` : padding;
  const resolvedSize = typeof size === "number" ? `${size}px` : size;

  if (radius) styleVariables["--rdmt-radius"] = radius;
  if (colors?.backgroundColor)
    styleVariables["--rdmt-bg-light"] = colors.backgroundColor;
  if (colors?.backgroundColorDark)
    styleVariables["--rdmt-bg-dark"] = colors.backgroundColorDark;
  if (colors?.color) styleVariables["--rdmt-color-light"] = colors.color;
  if (colors?.colorDark) styleVariables["--rdmt-color-dark"] = colors.colorDark;
  if (colors?.colorHover)
    styleVariables["--rdmt-color-hover-light"] = colors.colorHover;
  if (colors?.colorHoverDark)
    styleVariables["--rdmt-color-hover-dark"] = colors.colorHoverDark;
  if (resolvedSize) styleVariables["--rdmt-size"] = resolvedSize;
  if (resolvedPadding) styleVariables["--rdmt-padding"] = resolvedPadding;

  return styleVariables;
}

function toggleDarkMode(
  onModeChange: ((mode: ModeName) => void) | undefined,
  rootElement = document.documentElement,
  localStorageKey = "color-theme",
  darkClassName = "dark"
) {
  if (typeof document !== "undefined") {
    const isDark = rootElement.classList.contains(darkClassName);
    const nextTheme: ModeName = isDark ? "light" : "dark";
    rootElement.classList.toggle(darkClassName, nextTheme === darkClassName);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localStorageKey, nextTheme);
    }
    onModeChange?.(nextTheme);
  }
}
