import {
  Fragment,
  createElement as h,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  onContextMenu?: (event: ReactMouseEvent<HTMLSpanElement>) => void;
  onModeChange?: (mode: ModeName) => void;
  onThemeChange?: (theme: ThemeName) => void;
  theme?: ThemeName;
  defaultTheme?: ThemeName;
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
export type ThemeName = ModeName | "system";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function DarkModeToggle(props: DarkModeToggleProps) {
  const {
    className,
    darkClassName,
    wrapperClassName,
    colors,
    onClick,
    onContextMenu,
    onModeChange,
    onThemeChange,
    theme,
    defaultTheme,
    size,
    padding,
    rootElement,
    radius,
    localStorageKey,
    ...spanProps
  } = props;

  const managesTheme = theme !== undefined || defaultTheme !== undefined;
  const [uncontrolledTheme, setUncontrolledTheme] = useState<ThemeName>(() =>
    readStoredTheme(localStorageKey, defaultTheme ?? "system")
  );
  const [systemMode, setSystemMode] = useState<ModeName>(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  const selectedTheme = theme ?? uncontrolledTheme;
  const resolvedTheme = selectedTheme === "system" ? systemMode : selectedTheme;

  const styleVariables = buildStyleVariables(size, padding, radius, colors);
  const appliedSize = size ?? ENUM_defaultSize;

  useIsomorphicLayoutEffect(() => {
    if (!managesTheme || typeof document === "undefined") return;

    const root = rootElement ?? document.documentElement;
    persistTheme(localStorageKey, selectedTheme);
    applyTheme(root, darkClassName ?? "dark", selectedTheme);
  }, [darkClassName, localStorageKey, managesTheme, rootElement, selectedTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const nextPref = mediaQuery.matches ? "dark" : "light";
      setSystemMode(nextPref);
      if (selectedTheme === "system") {
        const root = rootElement ?? document.documentElement;
        applyTheme(root, darkClassName ?? "dark", "system");
        onModeChange?.(nextPref);
      }
    };

    mediaQuery.addEventListener?.("change", handleSystemChange);
    return () => mediaQuery.removeEventListener?.("change", handleSystemChange);
  }, [darkClassName, onModeChange, rootElement, selectedTheme]);

  useEffect(() => {
    if (!menuOpen || typeof document === "undefined") return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const longPressTimerRef = useRef<number | null>(null);

  function handleSelectTheme(nextTheme: ThemeName) {
    if (theme === undefined) setUncontrolledTheme(nextTheme);
    persistTheme(localStorageKey, nextTheme);
    applyTheme(
      rootElement ?? (typeof document !== "undefined" ? document.documentElement : null),
      darkClassName ?? "dark",
      nextTheme
    );
    onThemeChange?.(nextTheme);
    onModeChange?.(resolveTheme(nextTheme));
    setMenuOpen(false);
  }

  function handleContextMenu(event: ReactMouseEvent<HTMLElement> | MouseEvent) {
    if ("preventDefault" in event) event.preventDefault();
    if ("stopPropagation" in event) event.stopPropagation();
    setMenuOpen((prev) => !prev);
    if (onContextMenu && "nativeEvent" in event) {
      onContextMenu(event as unknown as ReactMouseEvent<HTMLSpanElement>);
    }
  }

  function handleToggle(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.button === 2) {
      handleContextMenu(event);
      return;
    }

    if (props.preventDefault !== true) {
      if (managesTheme) {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        if (theme === undefined) setUncontrolledTheme(nextTheme);
        persistTheme(localStorageKey, nextTheme);
        applyTheme(
          rootElement ?? (typeof document !== "undefined" ? document.documentElement : null),
          darkClassName ?? "dark",
          nextTheme
        );
        onThemeChange?.(nextTheme);
        onModeChange?.(nextTheme);
      } else {
        toggleDarkMode(onModeChange, rootElement, localStorageKey, darkClassName);
      }
    }
    if (onClick) {
      onClick(event as unknown as ReactMouseEvent<HTMLSpanElement>);
    }
  }

  function handleTouchStart() {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = window.setTimeout(() => {
      setMenuOpen(true);
    }, 450);
  }

  function handleTouchEnd() {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }

  const themeOptions: Array<{ id: ThemeName; label: string; icon: string }> = [
    { id: "light", label: "Light", icon: "☀️" },
    { id: "dark", label: "Dark", icon: "🌙" },
    { id: "system", label: "System", icon: "💻" },
  ];

  return h(
    "span",
    {
      ref: wrapperRef,
      className: `rdmt-wrap${wrapperClassName ? ` ${wrapperClassName}` : ""}`,
      "data-rdmt-dark": managesTheme && resolvedTheme === "dark" ? "true" : undefined,
      onContextMenu: handleContextMenu,
      ...spanProps,
    },
    h(
      Fragment,
      null,
      h(
        ENUM_div,
        {
          className: `${ENUM_className}${className ? ` ${className}` : ""}`,
          "data-rdmt-dark": managesTheme && resolvedTheme === "dark" ? "true" : undefined,
          style: styleVariables,
          onClick: handleToggle,
          onContextMenu: handleContextMenu,
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          onTouchMove: handleTouchEnd,
        },
        h(
          ENUM_div,
          {
            className: `${ENUM_className}t`,
            title: "Left-click to toggle, right-click for options",
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
      ),
      menuOpen &&
        h(
          ENUM_div,
          {
            className: "rdmt-menu",
            role: "menu",
            "aria-label": "Theme options",
          },
          themeOptions.map((option) =>
            h(
              "button",
              {
                key: option.id,
                type: "button",
                className: "rdmt-menu-item",
                role: "menuitemradio",
                "aria-checked": selectedTheme === option.id,
                "data-active": selectedTheme === option.id ? "true" : undefined,
                onClick: (e) => {
                  e.stopPropagation();
                  handleSelectTheme(option.id);
                },
              },
              h("span", { "aria-hidden": "true" }, option.icon),
              h("span", null, option.label),
              selectedTheme === option.id &&
                h("span", { className: "rdmt-menu-check" }, "✓")
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

function readStoredTheme(localStorageKey: string | undefined, fallback: ThemeName) {
  if (typeof window === "undefined") return fallback;

  const storedTheme = window.localStorage.getItem(localStorageKey ?? "color-theme");
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : fallback;
}

function persistTheme(localStorageKey: string | undefined, theme: ThemeName) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(localStorageKey ?? "color-theme", theme);
  }
}

function resolveTheme(theme: ThemeName): ModeName {
  if (theme !== "system") return theme;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(
  root: HTMLElement | null,
  darkClassName: string,
  theme: ThemeName
) {
  if (!root) return;
  root.classList.toggle(darkClassName, resolveTheme(theme) === "dark");
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
    rootElement.classList.toggle(darkClassName, nextTheme === "dark");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localStorageKey, nextTheme);
    }
    onModeChange?.(nextTheme);
  }
}
