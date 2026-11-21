import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "@vis.gl/react-maplibre";
import type { ControlPosition } from "@vis.gl/react-maplibre";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
};

// see: https://github.com/visgl/react-map-gl/blob/master/examples/maplibre/draw-polygon/src/draw-control.ts
export default function DrawControl(props: DrawControlProps) {
  // @ts-expect-error TODO: FIX
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      // @ts-expect-error TODO: FIX
      map.on("draw.create", props.onCreate);
      // @ts-expect-error TODO: FIX
      map.on("draw.update", props.onUpdate);
      // @ts-expect-error TODO: FIX
      map.on("draw.delete", props.onDelete);
    },
    ({ map }) => {
      // @ts-expect-error TODO: FIX
      map.off("draw.create", props.onCreate);
      // @ts-expect-error TODO: FIX
      map.off("draw.update", props.onUpdate);
      // @ts-expect-error TODO: FIX
      map.off("draw.delete", props.onDelete);
    },
    {
      position: props.position,
    },
  );

  return null;
}
