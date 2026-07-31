import type { NominatimSearchResult } from "../../types/Nominatim";
import apiCall from "./apiCaller";

class Nominatim {
  static search(name: string) {
    const params = new URLSearchParams({
      q: `${name} railway station`,
      countrycodes: "gb",
      format: "json",
    });

    return apiCall("GET", "search", params) as Promise<NominatimSearchResult[]>;
  }

  static reverse(lat: string, lon: string) {
    const params = new URLSearchParams({
      lat,
      lon,
      countrycodes: "gb",
      format: "json",
    });
    return apiCall("GET", "reverse", params) as Promise<NominatimSearchResult>;
  }
}

export default Nominatim;
