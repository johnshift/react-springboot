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
          class:bg-amber-400={$NotificationStore.type == "loading"}
          class:bg-blue-400={$NotificationStore.type == "info"}
          class:bg-green-600={$NotificationStore.type == "success"}
          class:bg-red-700={$NotificationStore.type == "error"}
          class="p-3 px-5 text-white font-semibold text-center rounded-lg flex"
        >
          {#if $NotificationStore.type == "loading"}
            <svg
              class="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          {/if}
          {$NotificationStore.msg}
        </div>
      </div>
    {/if}
  </div>
{/key}
