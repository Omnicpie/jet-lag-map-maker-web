import { useCallback, useEffect, useMemo, useState } from "react";
import "./Generating.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import Railrover from "../../api/railrover/Railrover";
import useResults from "../../hooks/useResults/useResults";
import { useNavigate } from "react-router";
import { findStation } from "../../utils/lookup/lookup.utils";
import useSettings from "../../hooks/useSettings/useSettings";

type GeneratingProps = {
  roverLink: string;
  setRoverLink: React.Dispatch<React.SetStateAction<string>>;
};

const Generating = ({ roverLink, setRoverLink }: GeneratingProps) => {
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
  const navigate = useNavigate();
  const { apiKey, lookupTool } = useSettings();

  const progressPhase = useCallback(() => {
    navigate("/confirm");
  }, [navigate]);

  const cancel = () => {
    setRoverLink("");
    navigate("/new");
  };

  const progress = useMemo(() => {
    if (!loading && stations) {
      return (lookupIndex / stations?.length) * 100;
    }

    return 0;
  }, [loading, lookupIndex, stations]);

  useEffect(() => {
    const abort = new AbortController();
    Railrover.get(roverLink, abort.signal)
      .then((res) => {
        setStations(res);
        setError("");
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch data");
      })
      .finally(() => setLoading(false));

    return () => {
      abort.abort();
    };
  }, [roverLink]);

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

    const find = async () => {
      const matchedStation = await findStation(currentStation, {
        provider: lookupTool,
        apiKey,
      });
      if (!matchedStation) {
        setFailedStations([...failedStations, currentStation]);
      } else {
        setCalculatedStations([...calculatedStations, matchedStation]);
      }
      setLookupIndex((prev) => prev + 1);
    };

    find();
  }, [
    currentStation,
    failedStations,
    setCalculatedStations,
    calculatedStations,
    setFailedStations,
    lookupTool,
    apiKey,
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
