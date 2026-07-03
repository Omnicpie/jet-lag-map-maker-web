import type { HidingZone } from "../../types/HidingZone";
import type { StationResult } from "../../types/StationResult";

const escapeCsv = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
};

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const stationsToCsv = (stations: StationResult[]): string => {
  const rows = stations.map(
    (station) =>
      `${escapeCsv(station.name)},${station.found.lat},${station.found.lon}`,
  );
  return ["name,latitude,longitude", ...rows].join("\n");
};

export const hidingZonesToKml = (zones: HidingZone[]): string => {
  const placemarks = zones.map((zone) => {
    const coordinates = zone.geometry.coordinates[0]
      .map(([lon, lat]) => `${lon},${lat},0`)
      .join(" ");
    return `    <Placemark>
      <name>${escapeXml(String(zone.id))}</name>
      <styleUrl>#hidingZone</styleUrl>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${coordinates}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Hiding Zones</name>
    <Style id="hidingZone">
      <PolyStyle>
        <color>7700ff00</color>
        <outline>1</outline>
      </PolyStyle>
      <LineStyle>
        <color>ff00ff00</color>
        <width>2</width>
      </LineStyle>
    </Style>
${placemarks.join("\n")}
  </Document>
</kml>
`;
};

export const downloadFile = (
  filename: string,
  content: string,
  mimeType: string,
): void => {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} b`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} kb`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} mb`;
};
