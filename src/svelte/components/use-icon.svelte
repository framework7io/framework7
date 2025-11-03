<script>
  import Icon from './icon.svelte';
  import Badge from './badge.svelte';

  let { icon } = $props();
</script>

<Icon {...icon.props}>
  {#if icon.badge}
    <Badge {...icon.badge.props}>{icon.badge.content}</Badge>
  {/if}
</Icon>
