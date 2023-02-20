<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';

	export let image: HTMLImageElement;

	let c: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let c2: HTMLCanvasElement;
	let ctx2: CanvasRenderingContext2D;

	let sprite_w = 0;
	let sprite_h = 0;
	let gridSize = 20;
	let xOffset = 0;
	let globalXOffset: number = 0;
	let yOffset = 0;

	settings.subscribe((v) => {
		console.log(v);
		if (!Number.isNaN(parseInt(v.spriteWidth))) {
			sprite_w = parseInt(v.spriteWidth);
		}

		if (!Number.isNaN(parseInt(v.spriteWidth))) {
			sprite_h = parseInt(v.spriteHeight);
		}

		if (!Number.isNaN(parseInt(v.gridSize))) {
			gridSize = parseInt(v.gridSize);
		}

		if (!Number.isNaN(parseInt(v.xOffset))) {
			xOffset = parseInt(v.xOffset);
		}

		if (!Number.isNaN(parseInt(v.globalXOffset))) {
			globalXOffset = parseInt(v.globalXOffset);
		}

		if (!Number.isNaN(parseInt(v.yOffset))) {
			yOffset = parseInt(v.yOffset);
		}
	});

	let spritesCountX = 0;
	let spritesCountY = 0;

	onMount(() => {
		c = document.querySelector('#canvas_1')!;
		c2 = document.querySelector('#canvas_2')!;
		ctx = c.getContext('2d')!;
		ctx2 = c2.getContext('2d')!;

		function updateSize() {
			c.width = image.naturalWidth;
			c.height = image.naturalHeight;
		}

		function anim() {
			ctx.rect(0, 0, c.width, c.height);
			updateSize();
			ctx.drawImage(image, 0, 0);

			if (sprite_h && sprite_w) {
				ctx.save();
				ctx.strokeStyle = 'red';

				if ($settings.repeat) {
					spritesCountX = 0;
					spritesCountY = 0;
					for (let y = 1; y + yOffset + sprite_h - 2 < c.height; y += sprite_h) {
						spritesCountY++;
						let xc = 0;
						for (let x = 1; x + xOffset + sprite_w - 2 < c.width; x += sprite_w) {
							xc++;
							spritesCountX = xc > spritesCountX ? xc : spritesCountX;
							if (x === 1 && globalXOffset != null) {
								ctx.strokeRect(globalXOffset * xc + x, yOffset + y, sprite_w - 2, sprite_h - 2);
							} else {
								ctx.strokeRect(xOffset * xc + x, yOffset + y, sprite_w - 2, sprite_h - 2);
							}
						}
					}
				} else {
					spritesCountX = 0;
					spritesCountY = 0;
					ctx.strokeRect(1 + xOffset, 1 + yOffset, sprite_w - 2, sprite_h - 2);
				}
				ctx.restore();
			}

			ctx.save();
			ctx.strokeStyle = '1px rbg(130, 130, 130, 0.2)';
			ctx.globalAlpha = 0.1;
			ctx.lineWidth = 1;
			for (let x = 0; x < c.width; x += gridSize) {
				for (let y = 0; y < c.height; y += gridSize) {
					if ((x + y) % (gridSize * 2) == 0) {
						ctx.fillRect(x + 0, y, gridSize, gridSize);
					}
				}
			}
			ctx.restore();

			requestAnimationFrame(anim);
		}

		anim();
	});

	let x = 0;
	function revert() {
		x--;
		c2.width = image.naturalWidth;
		c2.height = image.naturalHeight;
		ctx2.rect(0, 0, c2.width, c2.height);

		ctx2.save();
		ctx2.translate(sprite_w, 0);
		ctx2.scale(-1, 1);

		for (let x = 0; x <= spritesCountX; x++) {
			for (let y = 0; y <= spritesCountY; y++) {
				ctx2.drawImage(
					image,
					sprite_w * x,
					y * sprite_h,
					sprite_w,
					sprite_h,
					-sprite_w * x,
					y * sprite_h,
					sprite_w,
					sprite_h
				);
			}
		}

		ctx2.restore();
		requestAnimationFrame(revert);
	}
</script>

<div class="flex flex-col mb-2">
	<h2 class="text-slate-800 mb-0">Image</h2>
	<div class="flex">
		<span class="text-slate-400 text-xs">{`${c?.width}px / ${c?.height}px`}</span>
		{#if $settings.repeat}
			<span class="ml-3 text-slate-400 text-xs"
				>Sprites {`X: ${spritesCountX} | Y:${spritesCountY}`}</span
			>
		{/if}
	</div>
</div>
<canvas id="canvas_1" />
{#if $settings.repeat}
	<button class="border border-slate-300 mt-3 px-2" on:click={revert}
		>Render Sprites Reverted</button
	>
{/if}
<canvas id="canvas_2" />
