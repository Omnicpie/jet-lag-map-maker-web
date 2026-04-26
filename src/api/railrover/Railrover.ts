import apiCall from "./apiCaller";

class Railrover {
  static get(url: string, signal: AbortSignal) {
    const localLookup = `http://localhost:3000/railrover?railroverUrl=${url}`;
    return apiCall("GET", localLookup, signal) as Promise<string[]>;
  }
}

export default Railrover;
