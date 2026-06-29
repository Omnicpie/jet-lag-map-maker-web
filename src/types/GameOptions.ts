import type { Unit } from "./Unit";
import type { GameSize } from "./GameSize";

export type GameOptions = {
  units: Unit;
  gamesize: GameSize;
  customRadius?: number;
};
