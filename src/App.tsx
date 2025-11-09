import { useEffect, useState } from 'react'
// import './App.css'
import "@cloudscape-design/global-styles/index.css"
import { getListOfFeatures, type Feature } from './api';
import { ListOfFeatures } from './components/listOfFeaturesDropdown';
function App() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {

    const fetchFeatures = async () => {
      try {
        const resp = await getListOfFeatures()
        setFeatures(resp)
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  return (
      <ListOfFeatures items={features}/> 
  )
}

export default App
