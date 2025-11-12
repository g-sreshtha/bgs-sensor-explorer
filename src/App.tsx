import { useEffect, useState } from 'react'
import { getDatastreamsForFeature, getListOfFeatures, getObservationsForDatastream, type Datastream, type Feature, type Observation } from './api';
import { ListOfFeatures } from './components/listOfFeaturesDropdown';
import { Container, Header, SpaceBetween, Box, Alert, StatusIndicator, LiveRegion } from '@cloudscape-design/components';
import { DataStreamDropdown } from './components/listOfDatastreamsDropdown';
import StatisticsDisplay from './components/statisticsDisplay';
import ObservationsChart from './components/observationsChart';
import './App.css'
import { LoadingBar } from '@cloudscape-design/chat-components';

function App() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<number>();
  const [datastreams, setDatastreams] = useState<Datastream[]>([]);
  const [selectedDatastream, setSelectedDatastream] = useState<number>();
  const [observations, setObservations] = useState<Observation[]>([]);
  
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [loadingDatastreams, setLoadingDatastreams] = useState(false);
  const [loadingObservations, setLoadingObservations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoadingFeatures(true);
        const resp = await getListOfFeatures();
        setFeatures(resp);
      } catch (error) {
        console.error("Error fetching features:", error);
        setError("Failed to load features");
      } finally {
        setLoadingFeatures(false);
      }
    };
    fetchFeatures();
  }, []);

  useEffect(() => {
    if (!selectedFeature) {
      return;
    }

    const fetchDatastreams = async () => {
      try {
        setLoadingDatastreams(true);
        setError(null);
        setSelectedDatastream(undefined);
        setObservations([]);

        const resp = await getDatastreamsForFeature(selectedFeature);
        setDatastreams(resp);
      } catch (error) {
        console.error("Error fetching datastreams:", error);
        setError("Failed to load datastreams");
      } finally {
        setLoadingDatastreams(false);
      }
    };

    fetchDatastreams();
  }, [selectedFeature]);

  useEffect(() => {
    if (!selectedDatastream) {
      return;
    }

    const fetchObservations = async () => {
      try {
        setLoadingObservations(true);
        setError(null);

        const resp = await getObservationsForDatastream(selectedDatastream);
        setObservations(resp);
      } catch (error) {
        console.error("Error fetching observations:", error);
        setError("Failed to load observations");
      } finally {
        setLoadingObservations(false);
      }
    };
    fetchObservations();
  }, [selectedDatastream]);


  const statistics = observations.length > 0 ? {
    count: observations.length,
    min: Math.min(...observations.map(obs => obs.result)),
    max: Math.max(...observations.map(obs => obs.result)),
    mean: observations.reduce((sum, obs) => sum + obs.result, 0) / observations.length
  } : null;

  const selectedDatastreamInfo = datastreams.find(ds => ds['@iot.id'] === selectedDatastream);

  return (
    <>
      <div className='container'>
        <SpaceBetween size="l">
          <Container header={<Header
            variant="h1"
            description="Explore British Geological Survey Features of Interest and their sensor data."
          >
            British Geological Survey Sensors Plotter
          </Header>
          }
          />
          
          {selectedFeature && !loadingDatastreams && datastreams.length === 0 && (
            <Alert type="warning" header="No datastreams available">
              This feature of interest does not have any associated datastreams.
            </Alert>
          )}
          
          <div className="DropdownContainer"> 
            <div>
              <Box variant="awsui-key-label" margin={{ bottom: 'xs' }}>
                1. Select Feature of Interest
              </Box>
              <ListOfFeatures
                items={features}
                selectedFeature={selectedFeature}
                onSelect={setSelectedFeature}
                loading={loadingFeatures}
              />
            </div>
          
            {selectedFeature && (
              <div>
                {loadingDatastreams ? (
                <LiveRegion>
                    <Box
                      margin={{ bottom: "xs", left: "l" }}
                      color="text-body-secondary"
                    >
                      Loading datastreams...
                    </Box>
                    <LoadingBar variant="gen-ai" />
                  </LiveRegion>
                ) : datastreams.length > 0 ? (
                  <>
                  <Box variant="awsui-key-label" margin={{ bottom: 'xs' }}>
                    2. Select a Datastream
                  </Box>
                  <DataStreamDropdown
                    items={datastreams}
                    selectedDatastream={selectedDatastream}
                    onSelect={setSelectedDatastream}
                    loading={loadingDatastreams}
                  /></>
                ) : null}
              </div>
            )}
          </div>
          
          {loadingObservations && (
            <Container>
              <Box textAlign="center" padding="l">
                <StatusIndicator type="loading">
                  Loading observations...
                </StatusIndicator>
              </Box>
            </Container>
          )}
          
          {error && (
            <Container>
              <Box color="text-status-error">{error}</Box>
            </Container>
          )}
          
          {statistics && selectedDatastreamInfo && (
            <StatisticsDisplay
              count={statistics.count}
              min={statistics.min}
              max={statistics.max}
              mean={statistics.mean}
              unit={selectedDatastreamInfo.unitOfMeasurement?.symbol}
            />
          )}
          
          {observations.length > 0 && selectedDatastreamInfo && (
            <ObservationsChart
              observations={observations}
              datastreamName={selectedDatastreamInfo.name}
              unit={selectedDatastreamInfo.unitOfMeasurement?.symbol}
            />
          )}
        </SpaceBetween>
      </div>
    </>
  )
}

export default App