<script>
  import Icon from './icon';
  import Badge from './badge';

  export let icon = undefined;
</script>

<Icon {...icon.props}>
  {#if icon.badge}
    <Badge {...icon.badge.props}>{icon.badge.content}</Badge>
  {/if}
</Icon>
