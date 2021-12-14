<script lang="ts">
  import {
    JSON_HEADERS,
    LOGIN_API_URL,
    MSG_SOMETHING_WENT_WRONG,
    MSG_SUCCESSFUL_LOGIN,
  } from "../../lib/constants";

  import {
    NotificationType,
    notify,
    dismissNotification,
  } from "../../store/NotificationStore";
  import sleep from "../../lib/utils/sleep";
  import { MessageResponse } from "../../lib/types";

  let principal = "";
  let password = "";

  // set default notification
  let message = MSG_SOMETHING_WENT_WRONG;
  let notificationType: NotificationType = "error";

  let hasError = false;
  let isLoading = false;

  const submit = async () => {
    clear();
    isLoading = true;
    notify("Loading please wait", "loading");

    await sleep(2000);

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        body: JSON.stringify({ principal, password }),
        headers: JSON_HEADERS,
      });

      const jsonResponse = (await response.json()) as MessageResponse;
      if (!response.ok) {
        throw jsonResponse.message;
      }

      message = MSG_SUCCESSFUL_LOGIN;
      notificationType = "success";
    } catch (errmsg) {
      if (typeof errmsg === "string") {
        message = errmsg;
        hasError = true;
        return;
      }
    } finally {
      isLoading = false;
      notify(message, notificationType);
    }
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
