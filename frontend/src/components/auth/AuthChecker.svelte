<script lang="ts">
  import { onMount } from "svelte";

  import { KEY_AUTHORIZATION } from "../../lib/constants";

  onMount(() => {
    const token = localStorage.getItem(KEY_AUTHORIZATION);
    console.log("svelte token: ", token);
  });
</script>

<div id="fuck-you" />
