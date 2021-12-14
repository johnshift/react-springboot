<script lang="ts">
  import { fly } from "svelte/transition";
  import NotificationStore from "../../store/NotificationStore";
</script>

{#key $NotificationStore.msg}
  <div class="fixed bottom-5 w-full flex justify-center">
    {#if $NotificationStore.show}
      <div class:animate-shake={$NotificationStore.type == "error"}>
        <div
          in:fly={{ y: -15, duration: 300 }}
          out:fly={{ y: 15, duration: 300 }}
          class:bg-sky-400={$NotificationStore.type == "info"}
          class:bg-green-600={$NotificationStore.type == "success"}
          class:bg-red-700={$NotificationStore.type == "error"}
          class="p-5 text-white font-semibold text-center rounded"
        >
          {$NotificationStore.msg}
        </div>
      </div>
    {/if}
  </div>
{/key}
