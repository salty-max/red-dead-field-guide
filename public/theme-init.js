// Runs before first paint so the page never flashes the wrong theme. Kept external so the CSP can forbid inline scripts.
(() => {
  let preference;
  try { preference = localStorage.getItem("red-dead-field-guide.theme"); } catch {}
  const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = ["light", "dark"].includes(preference) ? preference : system;
})();
