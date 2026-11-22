import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Area } from "../../types/Area";

const AreaContext = createContext<{
  areas: Area[];
  setAreas: Dispatch<SetStateAction<Area[]>>;
}>({ areas: [], setAreas: () => {} });

export default AreaContext;
