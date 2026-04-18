import apiCall from "./apiCaller";

class Railrover {
  static get(url: string, signal: AbortSignal) {
    return apiCall("GET", url, signal);
  }
}

export default Railrover;
