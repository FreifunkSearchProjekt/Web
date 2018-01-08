export interface SearchResponseRootObject {
  status: Status;
  request: Request;
  hits?: (HitsEntity)[] | null;
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
  fields?: (string)[] | null;
  facets?: null;
  explain: boolean;
  sort?: (string)[] | null;
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
  Body?: (string)[] | null;
  Description?: (string)[] | null;
  Host?: (string)[] | null;
  Path?: (string)[] | null;
  Title?: (string)[] | null;
  URL?: (string)[] | null;
}
export interface Fields {
  Description: string;
  Host: string;
  Path: string;
  Title: string;
  URL: string;
}
export interface Facets {
}
