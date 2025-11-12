import { Container, Header, LineChart, Box } from "@cloudscape-design/components";
import type { Observation } from "../api";

interface ObservationsChartProps {
  observations: Observation[];
  datastreamName: string;
  unit?: string;
}

export default function ObservationsChart({ observations, datastreamName, unit }: ObservationsChartProps) {
  
  const numericObservations = observations.filter(obs => 
    typeof obs.result === 'number' && !isNaN(obs.result)
  );

  if (numericObservations.length === 0) {
    return (
      <Container header={<Header variant="h2">Observations over Time</Header>}>
        <Box textAlign="center" padding="l" color="text-body-secondary">
          No numeric observations available for this datastream.
        </Box>
      </Container>
    );
  }

  const sortedObservations = [...numericObservations].sort((a, b) =>
    new Date(a.phenomenonTime).getTime() - new Date(b.phenomenonTime).getTime()
  );

  const chartData = sortedObservations.map(obs => ({
    x: new Date(obs.phenomenonTime),
    y: obs.result as number
  }));

  const numericValues = numericObservations.map(obs => obs.result as number);

  return (
    <Container header={<Header variant="h2">Observations over Time</Header>}>
      <LineChart
        series={[
          {
            title: datastreamName,
            type: "line",
            data: chartData
          }
        ]}
        xDomain={[chartData[0]?.x, chartData[chartData.length - 1]?.x]}
        yDomain={[
          Math.min(...numericValues) * 0.95,
          Math.max(...numericValues) * 1.05
        ]}
        i18nStrings={{
          xTickFormatter: (value) => {
            const date = new Date(value);
            return date.toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          },
          yTickFormatter: (value) => `${value.toFixed(2)}${unit ? ` ${unit}` : ''}`
        }}
        ariaLabel="Sensor observations over time"
        height={260}
        xScaleType="time"
        yTitle={`Value${unit ? ` (${unit})` : ''}`}
        xTitle="Time"
        hideLegend={true}
        hideFilter={true}
        empty={
          <div>No data available</div>
        }
      />
    </Container>
  );
}