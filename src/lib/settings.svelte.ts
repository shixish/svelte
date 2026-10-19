import { createContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import { browser } from '$app/env';
import { PREFERS_DARK, applyTheme, readStoredTheme, storeTheme, type Theme } from '#lib/theme.ts';

export class Settings {
	#theme = $state<Theme>(browser ? readStoredTheme() : 'system');

	#prefersDark = new MediaQuery(PREFERS_DARK, true);

	constructor() {
		$effect(() => {
			applyTheme(this.#theme, this.#prefersDark.current);
		});
	}

	get theme() {
		return this.#theme;
	}

	set theme(theme: Theme) {
		this.#theme = theme;
		storeTheme(theme);
	}
}

export const [getSettings, setSettings] = createContext<Settings>();
