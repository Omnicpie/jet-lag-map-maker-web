import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Generating.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import Railrover from "../../api/railrover/Railrover";
import { findStation } from "../../utils/lookup/npm-lookup.utils";
import useResults from "../../hooks/useResults/useResults";

type GeneratingProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
  roverLink: string;
  setRoverLink: React.Dispatch<React.SetStateAction<string>>;
};

const Generating = ({
  setCurrentTab,
  roverLink,
  setRoverLink,
}: GeneratingProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [stations, setStations] = useState<string[] | undefined>();
  const {
    failedStations,
    setFailedStations,
    calculatedStations,
    setCalculatedStations,
  } = useResults();
  const [lookupIndex, setLookupIndex] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const progressPhase = useCallback(() => {
    setCurrentTab("confirm");
  }, [setCurrentTab]);

  const cancel = () => {
    setRoverLink("");
    setCurrentTab("new");
  };

  const progress = useMemo(() => {
    if (!loading && stations) {
      return (lookupIndex / stations?.length) * 100;
    }

    return 0;
  }, [loading, lookupIndex, stations]);

  console.log(progress);

  useEffect(() => {
    const abort = new AbortController();
    Railrover.get(roverLink, abort.signal)
      .then((res) => {
        setStations(res);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch data");
      })
      .finally(() => setLoading(false));

    return () => {
      abort.abort();
    };
  }, []);

  const currentStation = useMemo(() => {
    if (!stations) return "";
    return stations[lookupIndex];
  }, [stations, lookupIndex]);

  useEffect(() => {
    if (
      calculatedStations?.length + failedStations.length ===
      stations?.length
    ) {
      progressPhase();
    }
  }, [stations, calculatedStations, progressPhase, failedStations]);

  useEffect(() => {
    if (!currentStation) return;
    const matchedStation = findStation(currentStation);
    if (!matchedStation) {
      setFailedStations([...failedStations, currentStation]);
    } else {
      setCalculatedStations([...calculatedStations, matchedStation]);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLookupIndex((prev) => prev + 1);
  }, [
    currentStation,
    failedStations,
    setCalculatedStations,
    calculatedStations,
    setFailedStations,
  ]);

  const loadingStatus = useMemo(() => {
    if (stations) return "2/3 | Pulling Station info: " + currentStation;
    return "1/3 | Fetching info from " + roverLink;
  }, [roverLink, currentStation, stations]);

  return (
    <div className="generating-page">
      {error ? <div className="error-message">{error}</div> : null}
      <h1>Generating...</h1>
      <div className="progress-bar">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>
      {loadingStatus}
      {isMobile ? (
        <div className="lb-icon">
          <FontAwesomeIcon
            onClick={cancel}
            icon={faTimes}
            size="2xl"
            className="cancel-button"
          />
        </div>
      ) : (
        <Button label="Cancel" onClick={cancel} />
      )}
    </div>
  );
};

export default Generating;
