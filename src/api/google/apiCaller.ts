import { safeParse } from "../../utils/parse/parse.utils";

const apiCall = (
  verb: "GET",
  location: string,
  data?: string | object | URLSearchParams | FormData,
  signal?: AbortSignal,
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url = ["https://maps.googleapis.com/maps/api", location].join("/");
    if (data instanceof URLSearchParams) url = [url, data].join("?");

    xhr.open(verb, url, true);
    xhr.timeout = 10_000;
    xhr.setRequestHeader("User-Agent", "omnic-jet-lag-hide-seek-map-maker/1.0");

    signal?.addEventListener("abort", () => {
      xhr.abort();
    });

    xhr.onload = () => {
      resolve(safeParse(xhr.responseText));
    };

    xhr.onabort = () =>
      reject({ error: "Request aborted", status: xhr.status });
    xhr.ontimeout = () =>
      reject({ error: "Request timeout", status: xhr.status });
    xhr.onerror = () =>
      reject({ error: "Request could not send", status: xhr.status });

    if (!data || data instanceof URLSearchParams) {
      xhr.send();
    } else if (data instanceof FormData) {
      xhr.send(data);
    } else if (typeof data === "string") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    } else {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    }
  });
};

export default apiCall;
