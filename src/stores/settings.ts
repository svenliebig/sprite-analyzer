import { derived, writable } from 'svelte/store';

type Settings = {
	gridSize: string;
	spriteWidth: string;
	spriteHeight: string;
	xOffset: string;
	globalXOffset: string;
	yOffset: string;
	repeat: boolean;
};

type Stats = {
	imageWidth: number;
	imageHeight: number;
};

export const settings = writable<Settings>({
	spriteHeight: '',
	spriteWidth: '',
	xOffset: '0',
	globalXOffset: '0',
	yOffset: '0',
	gridSize: '20',
	repeat: false
});

export const getSettings = derived(settings, (s) => s);

export const stats = writable<Stats>({
	imageHeight: 0,
	imageWidth: 0
});
