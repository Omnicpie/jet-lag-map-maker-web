import { useCallback, useMemo, useSyncExternalStore } from "react";
import { safeParse } from "../../utils/parse/parse.utils";
import type { StationResult } from "../../types/StationResult";
import type { HidingZone } from "../../types/HidingZone";

const storageKey = "calculated-stations";
const changeKey = "calculated-stations-change";
const failedStorageKey = "failed-stations";
const failedChangeKey = "failed-stations-change";
const hidingZonesKey = "hiding-zones";
const hidingZonesChangeKey = "hiding-zones-change";

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
const hidingSubscribe = (callback: EventListener) => {
  window.addEventListener(failedChangeKey, callback);
  return () => {
    window.removeEventListener(failedChangeKey, callback);
  };
};

const getSnapshot = () => localStorage.getItem(storageKey);
const getHidingSnapshot = () => localStorage.getItem(hidingZonesKey);
const getFailedSnapshot = () => localStorage.getItem(failedStorageKey);

const useResults = () => {
  const unparsedStations = useSyncExternalStore(subscribe, getSnapshot);
  const unparsedHidingZones = useSyncExternalStore(
    hidingSubscribe,
    getHidingSnapshot,
  );
  const unparsedFailed = useSyncExternalStore(
    failedSubscribe,
    getFailedSnapshot,
  );

  const calculatedStations = useMemo(
    () => (safeParse(unparsedStations) as StationResult[]) || [],
    [unparsedStations],
  );

  const hidingZones = useMemo(
    () => (safeParse(unparsedHidingZones) as HidingZone[]) || [],
    [unparsedHidingZones],
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

  const setHidingZones = useCallback((v: HidingZone[]) => {
    if (v === null) {
      localStorage.removeItem(hidingZonesKey);
    } else {
      localStorage.setItem(hidingZonesKey, JSON.stringify(v));
    }

    window.dispatchEvent(new StorageEvent(hidingZonesChangeKey));
  }, []);

  return {
    calculatedStations,
    setFailedStations,
    failedStations,
    setCalculatedStations,
    hidingZones,
    setHidingZones,
  };
};

export default useResults;
