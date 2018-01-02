export interface Status {
  total: number;
  failed: number;
  successful: number;
}

export interface Query {
  query: string;
}

export interface Highlight {
  style: string;
  fields?: any;
}

export interface Request {
  query: Query;
  size: number;
  from: number;
  highlight: Highlight;
  fields: string[];
  facets?: any;
  explain: boolean;
  sort: string[];
  includeLocations: boolean;
}

export interface Locations {
  URL: any;
}

export interface Fragments {
  URL: string[];
}

export interface Fields {
  Description: string;
  Path: string;
  Title: string;
  URL: string;
}

export interface Hit {
  index: string;
  id: string;
  score: number;
  locations: Locations;
  fragments: Fragments;
  sort: string[];
  fields: Fields;
}

export interface Facets {
}

export interface SearchResponseRootObject {
  status: Status;
  request: Request;
  hits: Hit[];
  total_hits: number;
  max_score: number;
  took: number;
  facets: Facets;
}

