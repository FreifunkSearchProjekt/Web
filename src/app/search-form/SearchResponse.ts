export interface SearchResponseRootObject {
  status: Status;
  request: Request;
  hits?: HitsEntity[] | null;
  total_hits: number;
  max_score: number;
  took: number;
  facets: Facets;
}
export interface Status {
  total: number;
  failed: number;
  successful: number;
}
export interface Request {
  query: Query;
  size: number;
  from: number;
  highlight: Highlight;
  fields?: string[] | null;
  facets?: null;
  explain: boolean;
  sort?: string[] | null;
  includeLocations: boolean;
}
export interface Query {
  query: string;
}
export interface Highlight {
  style: string;
  fields?: null;
}
export interface HitsEntity {
  index: string;
  id: string;
  score: number;
  locations: Locations;
  fragments: Fragments;
  sort?: (string)[] | null;
  fields: Fields;
}
export interface Locations {
  Body: any | null;
  Host: any | null;
  URL: any | null;
  Description?: any | null;
  Path?: any | null;
  Title?: any | null;
}

export interface Fragments {
  body?: (string)[] | null;
  description?: (string)[] | null;
  host?: (string)[] | null;
  path?: (string)[] | null;
  title?: (string)[] | null;
  url?: (string)[] | null;
}

export interface Fields {
  description: string;
  host: string;
  path: string;
  title: string;
  url: string;
}

export interface Facets {
}
