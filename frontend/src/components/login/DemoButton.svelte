<script lang="ts">
  const demo = () => {
    console.log("demo clicked");
  };
</script>

<button
  class="w-24 border border-gray-300 bg-white font-semibold hover:bg-red-700 hover:text-white"
  on:click={demo}
>
  Demo
</button>
