<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '$lib/components/elements/icon.svelte';
  import { mdiInformationOutline } from '@mdi/js';

  export let title: string;
  export let icon: string;
  export let isSelected: boolean;
  export let flippedLogo = false;

  let showMoreInformation = false;

  const dispatch = createEventDispatcher<{
    selected: void;
  }>();
  const onButtonClicked = () => dispatch('selected');

  let hoverTimer = 0;

  const handleMouseEnter = () => {
    hoverTimer = setTimeout(() => {
      showMoreInformation = true;
    }, 300); // 0.3 seconds
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    showMoreInformation = false;
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={onButtonClicked}
  on:keydown={onButtonClicked}
  class="flex w-full place-items-start justify-start py-3 mx-3 rounded-lg transition-[padding] delay-100 duration-100 hover:cursor-pointer hover:bg-immich-gray hover:text-immich-primary dark:text-immich-dark-fg dark:hover:bg-immich-dark-gray dark:hover:text-immich-dark-primary
  {isSelected
    ? 'bg-immich-primary/10 text-immich-primary hover:bg-immich-primary/25 dark:bg-immich-dark-primary/10 dark:text-immich-dark-primary'
    : ''}
  xt-immich-primary hork:text-immich-dark-primary'm:px-3 md:px-3
  "
>
  <div class="has-tooltip">
    <div
      class="flex place-items-center overflow-hidden truncate"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <Icon path={icon} size="1.2em" class="shrink-0" flipped={flippedLogo} />

      {#if $$slots.moreInformation && showMoreInformation}
        <div class="tooltip ml-10 z-50">
          <div
            class="flex place-content-center place-items-center whitespace-nowrap rounded-lg border bg-immich-bg px-1.5 py-2 text-xs text-immich-fg shadow-lg dark:border-immich-dark-gray dark:bg-gray-600 dark:text-immich-dark-fg"
            transition:fade={{ duration: 200 }}
          >
            <slot name="moreInformation" />
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- <div
    class="h-0 overflow-hidden transition-[height] delay-1000 duration-100 sm:group-hover:h-auto group-hover:sm:overflow-visible md:h-auto md:overflow-visible"
  >
    {#if $$slots.moreInformation}
      <div
        class="relative flex cursor-default select-none justify-center"
        on:mouseenter={() => (showMoreInformation = true)}
        on:mouseleave={() => (showMoreInformation = false)}
      >
        <div class="p-1 text-gray-600 hover:cursor-help dark:text-gray-400">
          <Icon path={mdiInformationOutline} />
        </div>

        {#if showMoreInformation}
          <div class="absolute right-6 top-0">
            <div
              class="flex place-content-center place-items-center whitespace-nowrap rounded-3xl border bg-immich-bg px-6 py-3 text-xs text-immich-fg shadow-lg dark:border-immich-dark-gray dark:bg-gray-600 dark:text-immich-dark-fg"
              class:hidden={!showMoreInformation}
              transition:fade={{ duration: 200 }}
            >
              <slot name="moreInformation" />
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div> -->
</div>
