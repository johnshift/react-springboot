<script>
  import { notify } from "../store/NotificationStore";
</script>

<div>
  <button
    on:click={() => {
      notify("Incorrect username/email or password", "error");
    }}
  >
    Show Error
  </button>
  <br />
  <button
    on:click={() => {
      notify("FUCK YOU", "error");
    }}
  >
    Show Error2
  </button>
  <br />
  <button
    on:click={() => {
      notify("You have successfully logged in", "success");
    }}
  >
    Show Success
  </button>
  <br />
  <button
    on:click={() => {
      notify("You are already logged in", "info");
    }}
  >
    Show Info
  </button>
  <br />
</div>
