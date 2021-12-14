<script lang="ts">
  import {
    NotificationType,
    notify,
    dismissNotification,
  } from "../../store/NotificationStore";
  import sleep from "../../lib/utils/sleep";

  let principal = "";
  let password = "";

  let message = "Something went wrong :(";
  let notificationType: NotificationType = "error";
  let hasError = false;
  let isLoading = false;

  const submit = async (e: Event) => {
    clear();
    isLoading = true;
    notify("Loading please wait", "loading");

    await sleep(2000);

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    // todo: fetch request (simulate for now)
    message = "Incorrect username/email or password";
    hasError = true;

    isLoading = false;
    notify(message, notificationType);
  };

  const clear = () => {
    hasError = false;
    dismissNotification();
  };
</script>

<form
  on:submit|preventDefault={submit}
  on:change={clear}
  class:disable={isLoading}
>
  <input
    placeholder="Username or Email"
    class="w-full mb-10"
    class:border-red-300={hasError}
    bind:value={principal}
    on:focus={clear}
    disabled={isLoading}
  />

  <input
    placeholder="Password"
    type="password"
    class="w-full mb-10"
    bind:value={password}
    class:border-red-300={hasError}
    disabled={isLoading}
  />

  <div class="flex justify-between items-center">
    <div>
      <a href="/signup">Create an account</a>
    </div>
    <div>
      <button
        disabled={isLoading}
        type="submit"
        class="w-24 text-white font-semibold bg-red-700 hover:bg-red-600 hover:text-white "
      >
        Login
      </button>
    </div>
  </div>
</form>
