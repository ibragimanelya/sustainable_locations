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

export const defaultLocation: Location = {
  _id: "",
  title: "",
  longitude: 0,
  latitude: 0,
  date: 0,
  category: "",
  description: "",
  street: "",
  zip: 0,
  city: "",
  country: "",
  user: "",
  danger: "",
  time_category: "",
  tags: [],
  images: [],
  incident_id: -1,
  __v: 0,
}

export const completeLocation = (location) => {
  return {
    ...defaultLocation,
    ...location
  }
}