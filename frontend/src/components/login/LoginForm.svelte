<script lang="ts">
  import {
    NotificationType,
    notify,
    dismissNotification,
  } from "../../store/NotificationStore";
  import sleep from "../../lib/utils/sleep";

  let principal = "";
  let password = "";

  let promise = Promise.resolve();
  let message = "Something went wrong :(";
  let notificationType: NotificationType = "error";
  let hasError = false;

  const submit = async (e: Event) => {
    await sleep(500);

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    // simulate error response
    message = "Incorrect username/email or password";
    hasError = true;
  };

  const handleSubmit = (e: Event) => {
    dismissNotification();
    promise = submit(e).then(() => notify(message, notificationType));
  };

  const clear = () => {
    hasError = false;
  };
</script>

<div class="flex flex-col p-10 rounded-lg shadow-md border">
  {#await promise}
    <div class="w-full">
      <h1>Loading</h1>
    </div>
  {:then}
    <form on:submit|preventDefault={handleSubmit} on:change={clear}>
      <input
        placeholder="Username or Email"
        class="w-full mb-10"
        class:border-red-300={hasError}
        bind:value={principal}
        on:focus={clear}
      />

      <input
        placeholder="Password"
        type="password"
        class="w-full mb-10"
        bind:value={password}
        class:border-red-300={hasError}
      />

      <div class="flex justify-between items-center">
        <div>
          <a href="/signup">Create an account</a>
        </div>
        <div>
          <button
            type="submit"
            class="w-24 text-white font-semibold bg-red-700 hover:bg-red-600 hover:text-white "
          >
            Login
          </button>
        </div>
      </div>
    </form>
  {/await}
</div>
