import { useEffect, useState } from 'react'
import { getDatastreamsForFeature, getListOfFeatures, type Datastream, type Feature } from './api';
import { ListOfFeatures } from './components/listOfFeaturesDropdown';
import { Container, Header } from '@cloudscape-design/components';

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
      setDatastreams([]);
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



  return (
    <>
        <Container header={<Header
          variant="h1"
          description="Explore British Geological Survey Features of Interest and their sensor data."
        >
          British Geological Survey Sensors Plotter
        </Header>
        
      }
    ></Container>
      <ListOfFeatures 
            items={features}
            selectedFeature={selectedFeature}
            onSelect={setSelectedFeature}
            loading={loadingFeatures}
          />
    </>
  )
}

export default App
