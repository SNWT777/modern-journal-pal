
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ColorScheme = "blue" | "green" | "purple" | "red" | "orange" | "teal" | "indigo";
type FontSize = "small" | "medium" | "large";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
  defaultFontSize?: FontSize;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  setFontSize: (fontSize: FontSize) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  colorScheme: "blue",
  fontSize: "medium",
  setTheme: () => null,
  setColorScheme: () => null,
  setFontSize: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "blue",
  defaultFontSize = "medium",
  storageKey = "school-journal-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(`${storageKey}-mode`) as Theme) || defaultTheme
  );
  
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () => (localStorage.getItem(`${storageKey}-color`) as ColorScheme) || defaultColorScheme
  );
  
  const [fontSize, setFontSize] = useState<FontSize>(
    () => (localStorage.getItem(`${storageKey}-font`) as FontSize) || defaultFontSize
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);
  
  // Применяем класс цветовой схемы к корневому элементу
  useEffect(() => {
    const root = window.document.documentElement;
    // Удаляем все существующие цветовые схемы
    root.classList.remove(
      "theme-blue", 
      "theme-green", 
      "theme-purple", 
      "theme-red", 
      "theme-orange", 
      "theme-teal", 
      "theme-indigo"
    );
    
    // Добавляем новую цветовую схему
    root.classList.add(`theme-${colorScheme}`);
  }, [colorScheme]);
  
  // Применяем класс размера шрифта к корневому элементу
  useEffect(() => {
    const root = window.document.documentElement;
    // Удаляем все существующие размеры шрифта
    root.classList.remove("font-small", "font-medium", "font-large");
    
    // Добавляем новый размер шрифта
    root.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  const value = {
    theme,
    colorScheme,
    fontSize,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setColorScheme: (colorScheme: ColorScheme) => {
      localStorage.setItem(`${storageKey}-color`, colorScheme);
      setColorScheme(colorScheme);
    },
    setFontSize: (fontSize: FontSize) => {
      localStorage.setItem(`${storageKey}-font`, fontSize);
      setFontSize(fontSize);
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
