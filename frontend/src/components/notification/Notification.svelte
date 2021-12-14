<script lang="ts">
  import { fly } from "svelte/transition";
  import NotificationStore from "../../store/NotificationStore";
</script>

<!-- create a new notification for every new id (to display animations)-->
{#key $NotificationStore.id}
  <div class="fixed bottom-5 w-full flex justify-center">
    {#if $NotificationStore.show}
      <div class:animate-shake={$NotificationStore.type == "error"}>
        <div
          in:fly={{ y: -15, duration: 300 }}
          out:fly={{ y: 15, duration: 300 }}
          class:bg-blue-400={$NotificationStore.type == "info"}
          class:bg-green-600={$NotificationStore.type == "success"}
          class:bg-red-700={$NotificationStore.type == "error"}
          class="p-3 px-5 text-white font-semibold text-center rounded-lg"
        >
          {$NotificationStore.msg}
        </div>
      </div>
    {/if}
  </div>
{/key}
