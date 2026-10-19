export type Theme = 'light' | 'dark' | 'system';
export const THEME_KEY = 'theme';
export const PREFERS_DARK = '(prefers-color-scheme: dark)';

export function isTheme(value: unknown): value is Theme {
	return value === 'light' || value === 'dark' || value === 'system';
}

export function readStoredTheme(): Theme {
	const saved = localStorage.getItem(THEME_KEY);
	return isTheme(saved) ? saved : 'system';
}

export function storeTheme(theme: Theme) {
	if (theme === 'system') localStorage.removeItem(THEME_KEY);
	else localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(theme: Theme, prefersDark: boolean) {
	const dark = theme === 'dark' || (theme === 'system' && prefersDark);
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.classList.toggle('dark', dark);
	root.style.colorScheme = dark ? 'dark' : 'light';
}

const themeScriptConfig = { key: THEME_KEY, prefersDark: PREFERS_DARK };

/*
	Serialized into an inline <script> in <head> so the theme is applied before first paint.
	It runs standalone in the browser, so it must not reference anything outside its own body.
*/
export function applyStoredTheme({ key, prefersDark }: typeof themeScriptConfig) {
	let theme = 'system';
	try {
		const saved = localStorage.getItem(key);
		if (saved === 'light' || saved === 'dark') theme = saved;
	} catch {
		// localStorage can throw when storage is disabled; fall back to the system theme.
	}
	const dark = theme === 'dark' || (theme === 'system' && matchMedia(prefersDark).matches);
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.classList.toggle('dark', dark);
	root.style.colorScheme = dark ? 'dark' : 'light';
}

export const themeScript = `<script>(${applyStoredTheme})(${JSON.stringify(themeScriptConfig)})</script>`;
