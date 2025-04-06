import { useState } from "react";
import { Button, Stack } from "@mui/material";
import MapClusters from "./MapClusters";
import MapPolygons from "./MapPolygons";

const MapSwitcher = () => {
  const [viewMode, setViewMode] = useState("clusters");

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        onClick={() =>
          setViewMode((prev) => (prev === "clusters" ? "polygons" : "clusters"))
        }
      >
        Afficher {viewMode === "clusters" ? "par villes (prix m²)" : "les clusters"}
      </Button>

      {viewMode === "clusters" ? <MapClusters /> : <MapPolygons />}
    </Stack>
  );
};

export default MapSwitcher;