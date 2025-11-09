import React, { useState } from "react";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import type { Feature } from "../api";

interface ListOfFeaturesProps {
  items: Feature[];
  // onSelect?: (featureId: number) => void; // optional callback
}

export const ListOfFeatures: React.FC<ListOfFeaturesProps> = ({ items }) => {
  const [selected, setSelected] = useState<Feature | null>(null);

  const handleSelect = (item: Feature) => {
    setSelected(item);
    // if you add onSelect prop:
    // onSelect?.(item["@iot.id"]);
  };

  return (
    <ButtonDropdown
      items={items.map((f) => ({
        id: f["@iot.id"].toString(),
        text: f.name,
      }))}
      onItemClick={({ detail }) => {
        const feature = items.find(f => f["@iot.id"].toString() === detail.id);
        if (feature) handleSelect(feature);
      }}
    >
      {selected ? selected.name : "Select a feature"}
    </ButtonDropdown>
  );
};
