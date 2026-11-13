import { useSchoolConfig } from "@/hooks/use-school-config";
import { schoolColourCss } from "@shared/theme-colour";

/**
 * Applies the school's branding to the running app.
 *
 * One deployment serves every school, so the palette cannot be baked into the
 * stylesheet — it is read from the school's own configuration and written over
 * the CSS variables the rest of the app already uses. Dark mode gets a lighter
 * shade of a colour too deep to see on a dark page. A school with no theme
 * set simply keeps the defaults.
 */
export function SchoolTheme() {
  const { config } = useSchoolConfig();
  const theme = (config as any)?.theme as
    | { primary?: string; primaryForeground?: string }
    | undefined;

  if (!theme?.primary && !theme?.primaryForeground) return null;

  return (
    <style>{schoolColourCss(theme.primary, theme.primaryForeground)}</style>
  );
}
