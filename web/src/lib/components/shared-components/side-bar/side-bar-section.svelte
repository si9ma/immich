<script lang="ts">
  export let isWide: boolean = false;
  $: isWideClass = isWide ? 'md:w-64' : 'md:w-14';
  $: hoverIsWideClass = isWide ? 'hover:sm:w-64' : 'hover:sm:w-14';
</script>

<section
  id="sidebar"
  tabindex="-1"
  class="immich-scrollbar group relative z-10 flex w-14 flex-col gap-1 overflow-y-auto bg-immich-bg pt-4 transition-all duration-200 dark:bg-immich-dark-bg {hoverIsWideClass} hover:sm:border-r hover:sm:pr-3 hover:sm:shadow-2xl hover:sm:dark:border-r-immich-dark-gray {isWideClass} md:pr-3 hover:md:border-none hover:md:shadow-none"
>
  <slot />
</section>
