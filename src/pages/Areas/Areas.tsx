import { useCallback, useContext, useMemo, useState } from "react";
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
import type { Area as AreaType } from "../../types/Area";
import type { Feature } from "geojson";
import AreaContext from "../../contexts/AreaContext/AreaContext";

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
  const [customAreas, setCustomAreas] = useState({});
  const [drawing, setDrawing] = useState<string | null>(null);
  const { setAreas } = useContext(AreaContext);

  // TODO: Clean this up
  const data = useMemo(() => {
    // @ts-expect-error whatever
    const boundaryType = mapVisible.value;

    if (boundaryType === "custom") {
      return {
        data: {
          type: "FeatureCollection",
          features: Object.values(
            // @ts-expect-error monster
            customAreas?.[mapVisible?.area] || {},
          ),
        },
      };
    }

    // @ts-expect-error whatever
    if (boundaryType) return boundaryData?.[boundaryType as string];
  }, [customAreas, mapVisible]);

  const progressPhase = () => {
    const toArea: AreaType[] = Object.entries(areaValues).map((area) => {
      const [key, v] = area;
      const value = v as string;

      return {
        name: key,
        value,
        data:
          value === "custom"
            ? {
                type: "FeatureCollection",
                features: Object.values(
                  // @ts-expect-error monster
                  customAreas?.[key] || {},
                ),
              }
            : // @ts-expect-error get over it
              boundaryData?.[value]?.data,
      } as AreaType;
    });

    setAreas(toArea);
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

  const onUpdate = useCallback(
    // @ts-expect-error TODO: FIX
    (e) => {
      if (!drawing) return;
      setCustomAreas((currAreas) => {
        // @ts-expect-error TODO: FIX
        const currFeatures = currAreas?.[drawing];
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          newFeatures[f.id] = f;
        }
        return { ...currAreas, [drawing]: newFeatures };
      });
    },
    [drawing],
  );

  const onDelete = useCallback(
    // @ts-expect-error TODO: FIX
    (e) => {
      if (!drawing) return;
      setCustomAreas((currAreas) => {
        // @ts-expect-error TODO: FIX
        const currFeatures = currAreas?.[drawing];
        const newFeatures = { ...currFeatures };
        for (const f of e.features) {
          delete newFeatures[f.id];
        }
        return { ...currAreas, [drawing]: newFeatures };
      });
    },
    [drawing],
  );

  const drawingFeatures = useMemo(() => {
    if (!drawing) return [];

    return Object.values(
      // @ts-expect-error types yo
      customAreas?.[drawing] ?? {},
    ) as Feature[];
  }, [customAreas, drawing]);

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
              isDrawing={drawing === area}
              // @ts-expect-error Ill deal with you later
              data={customAreas?.[area]}
              setDrawing={() => setDrawing(drawing === area ? null : area)}
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
            {drawing ? (
              <DrawControl
                key={drawing}
                position="top-left"
                displayControlsDefault={false}
                controls={{
                  polygon: true,
                  trash: true,
                  line_string: true,
                }}
                features={drawingFeatures}
                onCreate={onUpdate}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ) : null}
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
