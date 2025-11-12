import { Container, Header, LineChart } from "@cloudscape-design/components";
import type { Observation } from "../api";

interface ObservationsChartProps {
  observations: Observation[];
  datastreamName: string;
  unit?: string;
}

export default function ObservationsChart({ observations, datastreamName, unit }: ObservationsChartProps) {
  const sortedObservations = [...observations].sort((a, b) =>
    new Date(a.phenomenonTime).getTime() - new Date(b.phenomenonTime).getTime()
  );

  const chartData = sortedObservations.map(obs => ({
    x: new Date(obs.phenomenonTime),
    y: obs.result
  }));

  return (
    <Container header={<Header variant="h2">Time Series Data</Header>}>
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
          Math.min(...observations.map(obs => obs.result)) * 0.95,
          Math.max(...observations.map(obs => obs.result)) * 1.05
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
        height={300}
        xScaleType="time"
        yTitle={`Value${unit ? ` (${unit})` : ''}`}
        xTitle="Time"
        empty={
          <div>No data available</div>
        }
      />
    </Container>
  );
}
