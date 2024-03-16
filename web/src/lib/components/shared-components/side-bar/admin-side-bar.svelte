<script lang="ts">
  import SideBarLink from '$lib/components/shared-components/side-bar/side-bar-link.svelte';
  import SideBarSection from '$lib/components/shared-components/side-bar/side-bar-section.svelte';
  import StatusBox from '$lib/components/shared-components/status-box.svelte';
  import { AppRoute } from '$lib/constants';
  import { mdiAccountMultipleOutline, mdiBookshelf, mdiCog, mdiServer, mdiSync, mdiTools } from '@mdi/js';
</script>

<SideBarSection>
  <a data-sveltekit-preload-data="hover" href={AppRoute.ADMIN_USER_MANAGEMENT} draggable="false">
    <SideBarButton
      title="Users"
      icon={mdiAccountMultipleOutline}
      isSelected={$page.route.id === AppRoute.ADMIN_USER_MANAGEMENT}
    />
  </a>
  <a data-sveltekit-preload-data="hover" href={AppRoute.ADMIN_JOBS} draggable="false">
    <SideBarButton title="Jobs" icon={mdiSync} isSelected={$page.route.id === AppRoute.ADMIN_JOBS} />
  </a>
  <a data-sveltekit-preload-data="hover" href={AppRoute.ADMIN_SETTINGS} draggable="false">
    <SideBarButton title="Settings" icon={mdiCog} isSelected={$page.route.id === AppRoute.ADMIN_SETTINGS} />
  </a>
  <a data-sveltekit-preload-data="hover" href={AppRoute.ADMIN_LIBRARY_MANAGEMENT} draggable="false">
    <SideBarButton
      title="External Libraries"
      icon={mdiBookshelf}
      isSelected={$page.route.id === AppRoute.ADMIN_LIBRARY_MANAGEMENT}
    />
  </a>
  <a data-sveltekit-preload-data="hover" href={AppRoute.ADMIN_STATS} draggable="false">
    <SideBarButton title="Server Stats" icon={mdiServer} isSelected={$page.route.id === AppRoute.ADMIN_STATS} />
  </a>
  <a data-sveltekit-preload-data="off" href={AppRoute.ADMIN_REPAIR} draggable="false">
    <SideBarButton title="Repair" icon={mdiTools} isSelected={$page.route.id === AppRoute.ADMIN_REPAIR} />
  </a>
  <!-- <div class="mb-6 mt-auto">
  <nav aria-label="Primary">
    <SideBarLink title="Users" routeId={AppRoute.ADMIN_USER_MANAGEMENT} icon={mdiAccountMultipleOutline} />
    <SideBarLink title="Jobs" routeId={AppRoute.ADMIN_JOBS} icon={mdiSync} />
    <SideBarLink title="Settings" routeId={AppRoute.ADMIN_SETTINGS} icon={mdiCog} />
    <SideBarLink title="External Libraries" routeId={AppRoute.ADMIN_LIBRARY_MANAGEMENT} icon={mdiBookshelf} />
    <SideBarLink title="Server Stats" routeId={AppRoute.ADMIN_STATS} icon={mdiServer} />
    <SideBarLink title="Repair" routeId={AppRoute.ADMIN_REPAIR} icon={mdiTools} preloadData={false} />
  </nav>

  <div class="mb-6 mt-auto">
    <StatusBox />
  </div> -->
</SideBarSection>
