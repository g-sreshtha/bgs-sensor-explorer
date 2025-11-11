import React from "react";
import type { Feature } from "../api";
import { Select } from "@cloudscape-design/components";

interface Props {
  items: Feature[];
  selectedFeature?: number;
  onSelect: (featureId: number | undefined) => void;
  loading?: boolean;
}


export const ListOfFeatures: React.FC<Props> = ({ 
  items, 
  selectedFeature, 
  onSelect,
  loading 
}) => {

    const options = items.map(feature => ({
    label: feature.name,
    value: String(feature['@iot.id']),
    description: feature.description
  }));

  const selectedOption = selectedFeature 
    ? options.find(opt => opt.value === String(selectedFeature))
    : null;;

    return (
    <Select
      selectedOption={selectedOption || null}
      onChange={({ detail }) => {
        onSelect(detail.selectedOption ? Number(detail.selectedOption.value) : undefined);
      }}
      options={options}
      placeholder="Select a Feature of Interest"
      loadingText="Loading features..."
      statusType={loading ? "loading" : "finished"}
      disabled={loading}
      filteringType="auto"
    />
  );
};
