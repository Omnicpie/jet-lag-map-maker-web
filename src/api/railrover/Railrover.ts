import apiCall from "./apiCaller";

class Railrover {
  static get(url: string, signal: AbortSignal) {
    return apiCall("GET", `railrover?railroverUrl=${url}`, signal) as Promise<
      string[]
    >;
  }
}

export default Railrover;
