
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

  // Apply theme (light/dark) to document element
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
  
  // Apply color scheme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all existing color schemes
    root.classList.remove(
      "theme-blue", 
      "theme-green", 
      "theme-purple", 
      "theme-red", 
      "theme-orange", 
      "theme-teal", 
      "theme-indigo"
    );
    
    // Apply the new color scheme
    root.classList.add(`theme-${colorScheme}`);
    
    // Update CSS variables based on color scheme
    updateColorVariables(colorScheme, theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, [colorScheme, theme]);
  
  // Apply font size to document element
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all existing font sizes
    root.classList.remove("font-small", "font-medium", "font-large");
    
    // Apply the new font size
    root.classList.add(`font-${fontSize}`);
    
    // Update font size variables
    updateFontSizeVariables(fontSize);
  }, [fontSize]);
  
  // Update CSS color variables based on selected color scheme
  const updateColorVariables = (scheme: ColorScheme, isDark: boolean) => {
    const root = window.document.documentElement;
    
    // Define color values for each scheme
    const colors = {
      blue: {
        primary: isDark ? "217.2 91.2% 59.8%" : "220 100% 50%",
        secondary: isDark ? "217.2 32.6% 17.5%" : "220 100% 96%",
        accent: isDark ? "217.2 91.2% 59.8%" : "220 100% 60%",
        border: isDark ? "217.2 32.6% 22.5%" : "214.3 31.8% 91.4%",
        ring: isDark ? "224.3 76.3% 60%" : "220 100% 50%"
      },
      green: {
        primary: isDark ? "142.1 70.6% 45.3%" : "142.1 76.2% 36.3%",
        secondary: isDark ? "142.4 71.8% 29.2%" : "138 76.5% 96.7%",
        accent: isDark ? "142.1 70.6% 45.3%" : "143 85% 56.3%",
        border: isDark ? "146.8 65.2% 18.5%" : "144.3 51.8% 91.4%",
        ring: isDark ? "142.1 76.2% 47.3%" : "142.1 76.2% 36.3%"
      },
      purple: {
        primary: isDark ? "262.1 83.3% 57.8%" : "262.1 83.3% 47.8%",
        secondary: isDark ? "263.4 69.8% 22.5%" : "261.2 83.3% 96.7%",
        accent: isDark ? "262.1 83.3% 57.8%" : "262.1 83.3% 57.8%",
        border: isDark ? "263.4 69.8% 22.5%" : "261.2 83.3% 91.4%",
        ring: isDark ? "262.1 83.3% 57.8%" : "262.1 83.3% 47.8%"
      },
      red: {
        primary: isDark ? "0 72.2% 50.6%" : "0 84.2% 60.2%",
        secondary: isDark ? "0 69.8% 22.5%" : "0 84.2% 96.7%",
        accent: isDark ? "0 72.2% 50.6%" : "0 84.2% 70.2%",
        border: isDark ? "0 69.8% 22.5%" : "0 84.2% 91.4%",
        ring: isDark ? "0 72.2% 50.6%" : "0 84.2% 60.2%"
      },
      orange: {
        primary: isDark ? "24.6 95% 53.1%" : "24.6 95% 43.1%",
        secondary: isDark ? "24.9 69.8% 22.5%" : "26 83.3% 96.7%",
        accent: isDark ? "24.6 95% 53.1%" : "24.6 95% 53.1%",
        border: isDark ? "24.9 69.8% 22.5%" : "26 83.3% 91.4%",
        ring: isDark ? "24.6 95% 53.1%" : "24.6 95% 43.1%"
      },
      teal: {
        primary: isDark ? "171.2 76.7% 46.7%" : "171.2 76.7% 36.7%",
        secondary: isDark ? "173.4 69.8% 22.5%" : "168.8 83.3% 96.7%",
        accent: isDark ? "171.2 76.7% 46.7%" : "171.2 76.7% 46.7%",
        border: isDark ? "173.4 69.8% 22.5%" : "168.8 83.3% 91.4%",
        ring: isDark ? "171.2 76.7% 46.7%" : "171.2 76.7% 36.7%"
      },
      indigo: {
        primary: isDark ? "226.2 100% 71.8%" : "226.2 100% 61.8%",
        secondary: isDark ? "223.4 69.8% 22.5%" : "226.2 83.3% 96.7%",
        accent: isDark ? "226.2 100% 71.8%" : "226.2 100% 71.8%",
        border: isDark ? "223.4 69.8% 22.5%" : "226.2 83.3% 91.4%",
        ring: isDark ? "226.2 100% 71.8%" : "226.2 100% 61.8%"
      }
    };
    
    // Set the CSS variables
    if (colors[scheme]) {
      root.style.setProperty('--primary', colors[scheme].primary);
      root.style.setProperty('--secondary', colors[scheme].secondary);
      root.style.setProperty('--accent', colors[scheme].accent);
      root.style.setProperty('--border', colors[scheme].border);
      root.style.setProperty('--ring', colors[scheme].ring);
      
      // Also set sidebar colors
      root.style.setProperty('--sidebar-primary', colors[scheme].primary);
      root.style.setProperty('--sidebar-accent', isDark ? `${scheme === 'blue' ? '220 100% 25%' : colors[scheme].secondary}` : `${colors[scheme].secondary}`);
      root.style.setProperty('--sidebar-border', isDark ? `${colors[scheme].border}` : `${colors[scheme].border}`);
      root.style.setProperty('--sidebar-ring', colors[scheme].ring);
    }
  };
  
  // Update font size variables
  const updateFontSizeVariables = (size: FontSize) => {
    const root = window.document.documentElement;
    
    const sizes = {
      small: {
        base: '0.875rem',
        heading1: '1.5rem',
        heading2: '1.25rem',
        heading3: '1.125rem',
        small: '0.75rem',
      },
      medium: {
        base: '1rem',
        heading1: '1.875rem',
        heading2: '1.5rem',
        heading3: '1.25rem',
        small: '0.875rem',
      },
      large: {
        base: '1.125rem',
        heading1: '2.25rem',
        heading2: '1.75rem',
        heading3: '1.5rem',
        small: '1rem',
      },
    };
    
    if (sizes[size]) {
      root.style.setProperty('--font-size-base', sizes[size].base);
      root.style.setProperty('--font-size-h1', sizes[size].heading1);
      root.style.setProperty('--font-size-h2', sizes[size].heading2);
      root.style.setProperty('--font-size-h3', sizes[size].heading3);
      root.style.setProperty('--font-size-small', sizes[size].small);
    }
  };

  // Store values in context
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
