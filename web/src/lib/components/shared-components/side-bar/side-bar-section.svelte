<script lang="ts">
  import { clickOutside } from '$lib/actions/click-outside';
  import { focusTrap } from '$lib/actions/focus-trap';
  import { menuButtonId } from '$lib/components/shared-components/navigation-bar/navigation-bar.svelte';
  import { mobileDevice } from '$lib/stores/mobile-device.svelte';
  import { sidebarStore } from '$lib/stores/sidebar.svelte';
  import { onMount, type Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    isWide?: boolean;
  }

  let { 
    children,
    isWide,
   }: Props = $props();

  let isWideClass = $derived(isWide ? 'md:w-64' : 'md:w-14');
  let hoverIsWideClass = $derived(isWide ? 'hover:sm:w-64' : 'hover:sm:w-14');
  const isHidden = $derived(!sidebarStore.isOpen && !mobileDevice.isFullSidebar);
  const isExpanded = $derived(sidebarStore.isOpen && !mobileDevice.isFullSidebar);

  onMount(() => {
    closeSidebar();
  });

  const closeSidebar = () => {
    if (!isExpanded) {
      return;
    }
    sidebarStore.reset();
    if (isHidden) {
      document.querySelector<HTMLButtonElement>(`#${menuButtonId}`)?.focus();
    }
  };
</script>

  <!-- class="immich-scrollbar relative z-10 w-0 sidebar:w-[16rem] overflow-y-auto overflow-x-hidden bg-immich-bg pt-8 transition-all duration-200 dark:bg-immich-dark-bg {isWideClass} {hoverIsWideClass}" -->
<section
  id="sidebar"
  tabindex="-1"
  class="immich-scrollbar group relative z-10 flex w-14 flex-col gap-1 overflow-y-auto bg-immich-bg pt-4 transition-all duration-200 dark:bg-immich-dark-bg {hoverIsWideClass} hover:sm:border-r hover:sm:pr-3 hover:sm:shadow-2xl hover:sm:dark:border-r-immich-dark-gray {isWideClass} md:pr-3 hover:md:border-none hover:md:shadow-none"
  class:shadow-2xl={isExpanded}
  class:dark:border-r-immich-dark-gray={isExpanded}
  class:border-r={isExpanded}
  class:w-[min(100vw,16rem)]={sidebarStore.isOpen}
  data-testid="sidebar-parent"
  inert={isHidden}
  use:clickOutside={{ onOutclick: closeSidebar, onEscape: closeSidebar }}
  use:focusTrap={{ active: isExpanded }}
>
  <div class="flex flex-col gap-1 h-max min-h-full">
    {@render children?.()}
  </div>
</section>
