<script lang="ts">
	export let value: string = '';
	export let id: string;
	export let label: string;
</script>

<div class="group relative h-6 mt-5 w-full">
	<input
		{id}
		bind:value
		placeholder={label}
		class="absolute bg-transparent border-transparent peer bottom-0 z-[10] w-full outline-none px-1 placeholder:text-transparent"
	/>
	<label
		for={id}
		class="peer-placeholder-shown:text-gray-500 text-gray-800 peer-focus:text-gray-800 absolute bottom-6 text-xs transition-all peer-placeholder-shown:bottom-[3px] peer-placeholder-shown:text-sm peer-focus:bottom-6 peer-focus:text-xs peer-placeholder-shown:pl-1 pl-0 peer-focus:pl-0"
		>{label}</label
	>
	<div
		class="absolute bottom-0 w-full h-6 border border-gray-600 group-hover:border-blue-400 peer-focus:border-blue-800 rounded-md z-[9]"
	/>
</div>
