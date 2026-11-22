import { useCallback, useMemo, useState } from "react";
import "./Areas.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faMap } from "@fortawesome/free-solid-svg-icons";
import { AREAS } from "../../utils/constants/constants";
import Area from "./Area/Area";
import countries from "../../data/countries.json";
import counties from "../../data/counties.json";
import districts from "../../data/districts.json";
import postcodes from "../../data/postcodes.json";
import wards from "../../data/wards.json";
import AreaDisplay from "../../components/AreaDisplay/AreaDisplay";
import DrawControl from "../../components/DrawControl/DrawControl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Map, {
  FullscreenControl,
  ScaleControl,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";

const boundaryData = {
  country: { data: countries, prop: "CTRY25CD" },
  county: { data: counties, prop: "CTYUA25CD" },
  borough: { data: districts, prop: "LAD26CD" },
  postcode: { data: postcodes, prop: "code" },
  ward: { data: wards, prop: "WD26CD" },
};

const Areas = () => {
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const [areas] = useState(AREAS);
  const [areaValues, setAreaValues] = useState(
    AREAS.reduce((o, key) => ({ ...o, [key]: "custom" }), {}),
  );
  const [mapVisible, setMapVisible] = useState({});
  const [features, setFeatures] = useState({});

  // TODO: Change to area stuff
  const data = useMemo(() => {
    // @ts-expect-error whatever
    const boundaryType = mapVisible.value;

    console.log("boud", boundaryType);

    // @ts-expect-error whatever
    if (boundaryType) return boundaryData?.[boundaryType as string];

    // @ts-expect-error whatever
  }, [mapVisible?.value]);

  const progressPhase = () => {
    navigate("/complete");
  };

  const updateValue = (a: string, x: string) => {
    // @ts-expect-error whatever
    if (mapVisible?.area === a) {
      setMapVisible({ area: a, value: x });
    }
    setAreaValues({ ...areaValues, [a]: x });
  };

  const setVisible = (area: string, v: boolean) => {
    // @ts-expect-error whatever
    if (v) setMapVisible({ area, value: areaValues?.[area] });
    else setMapVisible({});
  };

  // @ts-expect-error TODO: FIX
  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        // @ts-expect-error TODO: FIX
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  // @ts-expect-error TODO: FIX
  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        // @ts-expect-error TODO: FIX
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  console.log("fea", features);

  return (
    <div className="areas-page">
      <div className="header">
        <div className="left-side">
          <h2>Define Areas (optional)</h2>
        </div>
        <div className="mobile-menu" onClick={() => setMapOpen((p) => !p)}>
          <FontAwesomeIcon
            icon={mapOpen ? faTable : faMap}
            size="2xl"
            className=""
          />
        </div>

        <Button
          onClick={progressPhase}
          label="Confirm"
          className="confirm-button"
        />
      </div>
      <div className="content">
        <div className={`left${mapOpen ? "" : " open"}`}>
          {areas.map((area) => (
            <Area
              key={area}
              name={area}
              // @ts-expect-error Ill deal with you later
              value={areaValues?.[area]}
              setValue={(x: string) => updateValue(area, x)}
              // @ts-expect-error Ill deal with you later
              visible={mapVisible.area === area}
              setVisible={(v) => setVisible(area, v)}
            />
          ))}
        </div>
        <div className={`right${mapOpen ? " open" : ""}`}>
          <Map
            initialViewState={{
              latitude: 55,
              longitude: -4,
              zoom: 5.2,
            }}
            maxPitch={0}
            style={{ width: "100%", height: "100%" }}
            mapStyle={
              prefersDark
                ? import.meta.env.VITE_MAP_URL_DARK
                : import.meta.env.VITE_MAP_URL_LIGHT
            }
          >
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl />
            <DrawControl
              position="top-left"
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
                line_string: true,
              }}
              onCreate={onUpdate}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
            {data ? (
              <AreaDisplay
                /* @ts-expect-error no types */
                id={mapVisible.value}
                data={data.data}
                fillColor="#3388ff"
              />
            ) : null}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Areas;
