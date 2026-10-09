import { useSchoolConfig } from "@/hooks/use-school-config";

/**
 * Applies the school's branding to the running app.
 *
 * One deployment serves every school, so the palette cannot be baked into the
 * stylesheet — it is read from the school's own configuration and written over
 * the CSS variables the rest of the app already uses. A school with no theme
 * set simply keeps the defaults.
 */
export function SchoolTheme() {
  const { config } = useSchoolConfig();
  const theme = (config as any)?.theme as
    | { primary?: string; primaryForeground?: string }
    | undefined;

  if (!theme?.primary && !theme?.primaryForeground) return null;

  const vars = [
    theme.primary && `--primary: ${theme.primary};`,
    theme.primary && `--sidebar-primary: ${theme.primary};`,
    theme.primary && `--ring: ${theme.primary};`,
    theme.primaryForeground &&
      `--primary-foreground: ${theme.primaryForeground};`,
    theme.primaryForeground &&
      `--sidebar-primary-foreground: ${theme.primaryForeground};`,
  ]
    .filter(Boolean)
    .join("\n  ");

  return <style>{`:root {\n  ${vars}\n}`}</style>;
}
