class Railrover {
  static get(url: string, signal: AbortSignal) {
    return fetch(url, {
      signal,
      headers: {
        "User-Agent": "omnic-jet-lag-hide-seek-map-maker/1.0",
      },
    });
  }
}

export default Railrover;
