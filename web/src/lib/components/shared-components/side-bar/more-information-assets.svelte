<script lang="ts">
  import { getAssetStatistics } from '@immich/sdk';
  import { locale } from '$lib/stores/preferences.store';
  import LoadingSpinner from '$lib/components/shared-components/loading-spinner.svelte';
  import { mdiVideo, mdiImageArea } from '@mdi/js';
  import Icon from '$lib/components/elements/icon.svelte';

  export let assetStats: NonNullable<Parameters<typeof getAssetStatistics>[0]>;
</script>

{#await getAssetStatistics(assetStats)}
  <LoadingSpinner />
{:then data}
  <div>
    <p>
      {data.videos.toLocaleString($locale)}
      <Icon path={mdiVideo} size="1.2em" class="inline-block shrink-0" /> | {data.images.toLocaleString($locale)}
      <Icon path={mdiImageArea} size="1.2em" class="inline-block shrink-0" />
    </p>
  </div>
{/await}
