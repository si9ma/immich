<script lang="ts">
  import { shortcut } from '$lib/actions/shortcut';

  import { getAssetControlContext } from '$lib/components/timeline/AssetSelectControlBar.svelte';
  import { authManager } from '$lib/managers/auth-manager.svelte';
  import { copyToClipboard } from '$lib/utils';
  import { getAssetInfo } from '@immich/sdk';
  import { IconButton } from '@immich/ui';
  import { mdiContentCopy } from '@mdi/js';
  import { t } from 'svelte-i18n';
  import MenuOption from '../../shared-components/context-menu/menu-option.svelte';

  interface Props {
    menuItem?: boolean;
  }

  let { menuItem = false }: Props = $props();

  const { getAssets, clearSelect } = getAssetControlContext();

  const copyFilesPath = async () => {
    const assets = [...getAssets()];
    clearSelect();
    console.log(assets);

    // Collect all assets' originalPath into a list
    const originalPaths: string[] = [];

    for (const asset of assets) {
      try {
        const assetInfo = await getAssetInfo({ ...authManager.params, id: asset.id });
        if (assetInfo.originalPath) {
          originalPaths.push(assetInfo.originalPath);
        }
      } catch (error) {
        console.error(`Failed to get asset info for ${asset.id}:`, error);
      }
    }

    console.log('All original paths:', originalPaths);

    // Convert originalPaths to a text list and copy to clipboard
    if (originalPaths.length > 0) {
      // sort
      originalPaths.sort();
      const textList = originalPaths.join('\n');
      copyToClipboard(textList);
      console.log(`Copied ${originalPaths.length} file paths to clipboard:`);
      console.log(textList);
    } else {
      console.log('No original paths found to copy');
    }
  };
</script>

<svelte:document use:shortcut={{ shortcut: { key: 'd', shift: true }, onShortcut: copyFilesPath }} />

{#if menuItem}
  <MenuOption text={$t('copy_files_path')} icon={mdiContentCopy} onClick={copyFilesPath} />
{:else}
  <IconButton
    shape="round"
    color="secondary"
    variant="ghost"
    aria-label={$t('copy_files_path')}
    icon={mdiContentCopy}
    onclick={copyFilesPath}
  />
{/if}
