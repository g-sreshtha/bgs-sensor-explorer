import { Container, Header, ColumnLayout, Box } from "@cloudscape-design/components";

interface StatisticsDisplayProps {
  count: number;
  min: number;
  max: number;
  mean: number;
  unit?: string;
}

export default function StatisticsDisplay({ count, min, max, mean, unit }: StatisticsDisplayProps) {
  const unitDisplay = unit ? ` ${unit}` : '';

  return (
    <Container header={<Header variant="h2">Statistics</Header>}>
      <ColumnLayout columns={4} variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Data Points</Box>
          <Box variant="h3">{count.toLocaleString()}</Box>
        </div>
        <div>
          <Box variant="awsui-key-label">Minimum</Box>
          <Box variant="h3">{min.toFixed(2)}{unitDisplay}</Box>
        </div>
        <div>
          <Box variant="awsui-key-label">Maximum</Box>
          <Box variant="h3">{max.toFixed(2)}{unitDisplay}</Box>
        </div>
        <div>
          <Box variant="awsui-key-label">Mean</Box>
          <Box variant="h3">{mean.toFixed(2)}{unitDisplay}</Box>
        </div>
      </ColumnLayout>
    </Container>
  );
}
