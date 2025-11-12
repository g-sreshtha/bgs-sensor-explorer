import React from "react";
import type { Datastream } from "../api";
import { Select } from "@cloudscape-design/components";

interface Props {
  items: Datastream[];
  selectedDatastream?: number;
  onSelect: (datastreamId: number | undefined) => void;
  loading?: boolean;
}

export const DataStreamDropdown: React.FC<Props> = ({ 
  items, 
  selectedDatastream, 
  onSelect,
  loading 
}) => {
  const options = items.map(datastream => ({
    label: datastream.name,
    value: String(datastream["@iot.id"]),
    description: datastream.unitOfMeasurement ? `Unit: ${datastream.unitOfMeasurement}` : undefined
  }));

  const selectedOption = selectedDatastream 
    ? options.find(opt => opt.value === String(selectedDatastream))
    : null;

  return (
    <Select
      selectedOption={selectedOption || null}
      onChange={({ detail }) => {
        onSelect(
          detail.selectedOption ? Number(detail.selectedOption.value) : undefined
        );
      }}
      options={options}
      placeholder="Select a Datastream"
      loadingText="Loading datastreams..."
      statusType={loading ? "loading" : "finished"}
      disabled={loading || items.length === 0}
      empty="No datastreams available"
      filteringType="auto"
    />
  );
};