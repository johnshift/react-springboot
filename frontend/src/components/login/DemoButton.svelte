<script lang="ts">
  import { notify } from "../../store/NotificationStore";
</script>

<button
  class="w-24 border border-gray-300 bg-white font-semibold hover:bg-red-700 hover:text-white"
  on:click={() => {
    notify("Work in progress. Stay tuned!", "info");
  }}
>
  Demo
</button>
