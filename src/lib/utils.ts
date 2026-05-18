// src/lib/utils.ts

/**
 * Class-name combiner. Filters out falsy values so you can pass
 * conditional class strings safely:
 *   cn("base", isActive && "active", maybeUndefined)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a tech-stack array into a comma-separated, human-readable string
 * with an Oxford "and" — used in OG descriptions and aria-labels.
 */
export function formatTech(tech: string[]): string {
  if (tech.length === 0) return "";
  if (tech.length === 1) return tech[0];
  if (tech.length === 2) return `${tech[0]} and ${tech[1]}`;
  return `${tech.slice(0, -1).join(", ")}, and ${tech[tech.length - 1]}`;
}

/**
 * Resolve the best external link for a project, preferring `demo`, then
 * `href`, then `repo`. Returns `null` when no link is available.
 */
export function projectLink(p: {
  demo?: string;
  href?: string;
  repo?: string;
}): string | null {
  return p.demo || p.href || p.repo || null;
}
