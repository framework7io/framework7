<script>
  import Icon from './icon.svelte';
  import Badge from './badge.svelte';

  export let icon = undefined;
</script>

<Icon {...icon.props}>
  {#if icon.badge}
    <Badge {...icon.badge.props}>{icon.badge.content}</Badge>
  {/if}
</Icon>
