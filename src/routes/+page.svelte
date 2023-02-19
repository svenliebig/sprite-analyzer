<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Canvas from '../lib/canvas.svelte';
	import Input from '../lib/input.svelte';
	import { settings } from '../stores/settings';

	let error = '';
	let image: HTMLImageElement;
	let uploaderGone: boolean;

	function onFileUpload(event: Event & { currentTarget: EventTarget & HTMLInputElement }): any {
		if (event.currentTarget.files?.length === 1) {
			const img = document.createElement('img');
			img.src = URL.createObjectURL(event.currentTarget.files[0]);
			image = img;
		} else {
			error = 'No files';
		}
	}

	function setUploaderGone() {
		console.log('ON TRANS END');
		uploaderGone = true;
	}

	onMount(() => {
		// image = document.createElement('img');
		// image.src = 'https://dark-woods.vercel.app/assets/player_idle_right.png';
	});
</script>

<div
	class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
>
	<img
		src="https://play.tailwindcss.com/img/beams.jpg"
		alt=""
		class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
		width="1308"
	/>
	<div
		class="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
	/>
	{#if !image}
		<div
			class="relative bg-white px-6 pt-6 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
			transition:fly={{ y: -200, duration: 500 }}
		>
			<div class="mx-auto max-w-md">
				<h1 class="text-xl">🖼️ 🔎 Sprite Analyzer</h1>
				{#if error}
					<p class="text-red-600">{error}</p>
				{/if}
				<div class="divide-y divide-gray-300/50">
					<div class="space-y-6 pt-6 pb-2 text-base leading-7 text-gray-600">Upload Image</div>
					<input type="file" accept="image/jpeg, image/png, image/jpg" on:change={onFileUpload} />
					<output />
				</div>
			</div>
		</div>
	{/if}
	{#if image}
		<div
			class="relative grid grid-cols-[200px_auto] gap-4"
			transition:fly={{ y: 200, duration: 500 }}
		>
			<div class="rounded-r-md bg-white pt-4 pb-4 px-4 shadow-xl">
				<h2 class="text-slate-80">Seetings</h2>
				<Input id="gridsize" label="Grid Size" bind:value={$settings.gridSize} />
				<Input id="sw" label="Sprite Width" bind:value={$settings.spriteWidth} />
				<Input id="sh" label="Sprite Height" bind:value={$settings.spriteHeight} />
				<Input id="xo" label="XOffset" bind:value={$settings.xOffset} />
				<Input id="gxo" label="Global X Offset" bind:value={$settings.globalXOffset} />
				<Input id="yo" label="YOffset" bind:value={$settings.yOffset} />
				<label for="repeat">Repeat?</label>
				<input id="repeat" type="checkbox" bind:checked={$settings.repeat} />
			</div>
			<div class="rounded-l-md bg-white py-4 px-4 shadow-xl">
				<Canvas {image} />
			</div>
		</div>
	{/if}
</div>
