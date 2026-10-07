<script lang="ts">
  import '$lib/styles/base.css';
  import { onMount } from 'svelte';
  import { countPageLoad } from '$lib/page-load';

  let { children } = $props();

  onMount(countPageLoad);
</script>

{@render children()}
