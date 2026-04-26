import { useCallback, useMemo, useSyncExternalStore } from "react";
import { safeParse } from "../../utils/parse/parse.utils";
import type { StationResult } from "../../types/StationResult";

const storageKey = "calculated-stations";
const changeKey = "calculated-stations-change";
const failedStorageKey = "failed-stations";
const failedChangeKey = "failed-stations-change";

const subscribe = (callback: EventListener) => {
  window.addEventListener(changeKey, callback);
  return () => {
    window.removeEventListener(changeKey, callback);
  };
};
const failedSubscribe = (callback: EventListener) => {
  window.addEventListener(failedChangeKey, callback);
  return () => {
    window.removeEventListener(failedChangeKey, callback);
  };
};

const getSnapshot = () => localStorage.getItem(storageKey);
const getFailedSnapshot = () => localStorage.getItem(failedStorageKey);

const useResults = () => {
  const unparsedStations = useSyncExternalStore(subscribe, getSnapshot);
  const unparsedFailed = useSyncExternalStore(
    failedSubscribe,
    getFailedSnapshot,
  );

  const calculatedStations = useMemo(
    () => (safeParse(unparsedStations) as StationResult[]) || [],
    [unparsedStations],
  );

  const failedStations = useMemo(
    () => (safeParse(unparsedFailed) as string[]) || [],
    [unparsedFailed],
  );

  const setFailedStations = useCallback((v: string[]) => {
    if (v === null) {
      localStorage.removeItem(failedStorageKey);
    } else {
      localStorage.setItem(failedStorageKey, JSON.stringify(v));
    }

    window.dispatchEvent(new StorageEvent(failedChangeKey));
  }, []);

  const setCalculatedStations = useCallback((v: StationResult[]) => {
    if (v === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(v));
    }

    window.dispatchEvent(new StorageEvent(changeKey));
  }, []);

  return {
    calculatedStations,
    setFailedStations,
    failedStations,
    setCalculatedStations,
  };
};

export default useResults;
