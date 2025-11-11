const BASE_URL = "https://sensors.bgs.ac.uk/FROST-Server/v1.1";

export interface Feature {
  "@iot.id": number;
  name: string;
  description?: string;
  feature?: {
    type: string;
    coordinates: [number, number];
  };
  properties?: {
    active_yn: string;
    from_date: string;
    publish_yn: string;
    sen_id: number;
    type: string;
    z: number;
    z_crs: string;
  };
}

export interface Datastream {
  "@iot.id": number;
  name: string;
  description?: string;
  unitOfMeasurement?: {
    name: string;
    symbol: string;
    definition: string;
  };
}

export interface Observation {
  '@iot.id': number;
  result: number;
  phenomenonTime: string;
  resultTime: string;
}

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export async function getListOfFeatures(): Promise<Feature[]> {
  const URL = `${BASE_URL}/FeaturesOfInterest?$count=false`;
  const data = await getData<{ value: Feature[] }>(URL);
  return data.value;
}

export async function getDatastreamsForFeature(entityId: number): Promise<Datastream[]> {
  const URL = `${BASE_URL}/FeaturesOfInterest${entityId})/Datastreams`;
  const data = await getData<{ value: Datastream[] }>(URL);
  return data.value;
}

