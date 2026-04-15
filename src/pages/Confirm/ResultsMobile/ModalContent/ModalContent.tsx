import { useState, type Dispatch, type SetStateAction } from "react";
import type { StationResult } from "../../../../types/StationResult";
import "./ModalContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "@vis.gl/react-maplibre";
import useMediaQuery from "../../../../hooks/useMediaQuery/useMediaQuery";

type ModalContentProps = {
  station: StationResult;
  setOpen: Dispatch<SetStateAction<StationResult | undefined>>;
};

const ModalContent = ({ station, setOpen }: ModalContentProps) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [popupInfo, setPopupInfo] = useState<StationResult | undefined>();

  return (
    <div className="modal-content-mobile">
      <div className="header">
        <FontAwesomeIcon
          icon={faTimes}
          size="2xl"
          className="close-button"
          onClick={() => setOpen(undefined)}
        />
        <h3>{station.name}</h3>
      </div>
      <div className="content">
        <Map
          initialViewState={{
            latitude: station.found.lat,
            longitude: station.found.lon,
            zoom: 7,
          }}
          maxPitch={0}
          style={{ width: "100%" }}
          mapStyle={
            prefersDark
              ? "https://api.maptiler.com/maps/019d9342-d80e-77bf-b55c-cbff099f30f3/style.json?key=DADVHIhWafeGl3MV00CL"
              : "https://api.maptiler.com/maps/019d9342-c125-7d89-a536-728e04bcfef6/style.json?key=DADVHIhWafeGl3MV00CL"
          }
        >
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />
          <Marker
            latitude={station.found.lat}
            longitude={station.found.lon}
            key={station.found.name}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(station);
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                width: 10,
                height: 10,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "2px 2px #88888820",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                }}
              />
            </div>
          </Marker>

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.found.lon)}
              latitude={Number(popupInfo.found.lat)}
              onClose={() => setPopupInfo(undefined)}
            >
              <div className="popup-content">
                <p>
                  <b>
                    [{popupInfo.found.code}] {popupInfo.found.name}
                  </b>
                </p>
                <p>
                  {popupInfo.found.lat}, {popupInfo.found.lon}
                </p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default ModalContent;
