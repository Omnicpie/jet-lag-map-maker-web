import { useCallback, useMemo, useSyncExternalStore } from "react";
import { safeParse } from "../../utils/parse/parse.utils";
import type { Unit } from "../../types/Unit";
import type { GameSize } from "../../types/GameSize";
import type { LookupProvider } from "../../types/LookupProvider";

export type Settings = {
  units: Unit;
  gamesize: GameSize;
  customRadius?: number;
  lookupTool: LookupProvider;
  apiKey?: string;
};

const storageKey = "settings";
const changeKey = "setting-change";

const subscribe = (callback: EventListener) => {
  window.addEventListener(changeKey, callback);
  return () => {
    window.removeEventListener(changeKey, callback);
  };
};

const getSnapshot = () => localStorage.getItem(storageKey);

const useSettings = () => {
  const unparsed = useSyncExternalStore(subscribe, getSnapshot);

  const settings = useMemo(() => safeParse(unparsed) as Settings, [unparsed]);

  const setSettings = useCallback((v: string | null) => {
    if (v === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, v);
    }

    window.dispatchEvent(new StorageEvent(changeKey));
  }, []);

  const setField = useCallback(
    (key: keyof Settings, value: string | number) => {
      const updated = {
        ...settings,
        [key]: key === "customRadius" ? Number(value) : value,
      };
      localStorage.setItem(storageKey, JSON.stringify(updated));

      window.dispatchEvent(new StorageEvent(changeKey));
    },
    [settings],
  );

  return { settings, setSettings, setField, ...settings };
};

export default useSettings;
