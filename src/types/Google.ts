export type GoogleLocation = {
  lat: number;
  lng: number;
};

export type GoogleGeometry = {
  location: GoogleLocation;
};

export type GoogleGeocode = {
  geometry: GoogleGeometry;
  types: string[];
};

export type GoogleGeocodeApiReeponse = {
  results: GoogleGeocode[];
};
