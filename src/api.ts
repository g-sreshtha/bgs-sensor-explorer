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
  result: number | object;
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

export async function getDatastreamsForFeature(featureId: number): Promise<Datastream[]> {
  const URL = `${BASE_URL}/FeaturesOfInterest(${featureId})/Observations?$select=Datastream&$expand=Datastream&$top=500`;
  const data = await getData<{ value: Array<{ Datastream: Datastream }> }>(URL);
  const uniqueDatastreams = new Map<number, Datastream>();
  data.value.forEach(obs => {
    if (obs.Datastream) {
      uniqueDatastreams.set(obs.Datastream['@iot.id'], obs.Datastream);
    }
  });

  return Array.from(uniqueDatastreams.values());
}

export async function getObservationsForDatastream(
  datastreamId: number,
  limit: number = 1000
): Promise<Observation[]> {
  const URL = `${BASE_URL}/Datastreams(${datastreamId})/Observations?$top=${limit}&$orderby=phenomenonTime desc`;
  const data = await getData<{ value: Observation[] }>(URL);
  return data.value;
}
