import { useTheme } from "../../../theme/ThemeContext";
import styles from "./ThemeSwitch.module.css";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.switch}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
