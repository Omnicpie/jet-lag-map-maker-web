import type { GoogleGeocodeApiReeponse } from "../../types/Google";
import apiCall from "./apiCaller";

class Google {
  static geocode(apiKey: string, stationName: string, signal?: AbortSignal) {
    const params = new URLSearchParams({
      address: `${stationName} railway station`,
      key: apiKey,
      components: "country:GB",
    });

    return apiCall(
      "GET",
      "geocode/json",
      params,
      signal,
    ) as Promise<GoogleGeocodeApiReeponse>;
  }

  static reverseGeocode(apiKey: string, latlon: string, signal?: AbortSignal) {
    const params = new URLSearchParams({
      latlon,
      key: apiKey,
      components: "country:GB",
    });

    return apiCall(
      "GET",
      "geocode/json",
      params,
      signal,
    ) as Promise<GoogleGeocodeApiReeponse>;
  }
}

export default Google;
