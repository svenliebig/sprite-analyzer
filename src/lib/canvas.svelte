<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';

	export let image: HTMLImageElement;

	let c: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

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

	onMount(() => {
		c = document.querySelector('canvas')!;
		ctx = c.getContext('2d')!;

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
					for (let y = 1; y + yOffset + sprite_h - 2 < c.height; y += sprite_h) {
						let xc = 0;
						for (let x = 1; x + xOffset + sprite_w - 2 < c.width; x += sprite_w) {
							xc++;
							if (x === 1 && globalXOffset != null) {
								ctx.strokeRect(globalXOffset * xc + x, yOffset + y, sprite_w - 2, sprite_h - 2);
							} else {
								ctx.strokeRect(xOffset * xc + x, yOffset + y, sprite_w - 2, sprite_h - 2);
							}
						}
					}
				} else {
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
</script>

<h2 class="text-slate-800">Image {c?.width} / {c?.height}</h2>
<canvas />
