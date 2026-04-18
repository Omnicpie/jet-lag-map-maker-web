const apiCall = (verb: "GET", url: string, signal?: AbortSignal) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(verb, url, true);
    xhr.timeout = 10_000;
    xhr.setRequestHeader("User-Agent", "omnic-jet-lag-hide-seek-map-maker/1.0");
    xhr.setRequestHeader("Origin", "railrover.org");

    signal?.addEventListener("abort", () => {
      xhr.abort();
    });

    xhr.send();

    xhr.onload = () => {
      resolve(xhr.responseText);
    };

    xhr.onabort = () =>
      reject({ error: "Request aborted", status: xhr.status });
    xhr.ontimeout = () =>
      reject({ error: "Request timeout", status: xhr.status });
    xhr.onerror = () =>
      reject({ error: "Request could not send", status: xhr.status });
  });
};

export default apiCall;
