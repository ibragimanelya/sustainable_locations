export interface Location {
  _id: string;
  title: string;
  longitude: number;
  latitude: number;
  date: number;
  category: string;
  description: string;
  street: string;
  zip: number;
  city: string;
  country: string;
  user: string;
  danger: string;
  time_category: string;
  tags: string[];
  images: { _id: string; image: string }[];
  incident_id: number;
  __v: number;
}
