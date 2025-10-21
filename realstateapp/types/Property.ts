// types/Property.ts

export interface PropertyGallery {
  id: number;
  property: number;
  image: string;
  created_at: string;
}

export interface ReviewUser {
  id: number;
  email: string;
  username: string;
  display_name: string;
  avatar: string | null;
}
export interface AgentUser {
  id: number;
  email: string;
  username: string;
  display_name: string;
  avatar: string | null;
}

export interface PropertyReview {
  id: number;
  property: number;
  user: ReviewUser;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Amenities {
  icon: string; 
  title: string;
}

export interface Property {
  id: number;
  agent: AgentUser;
  name: string;
  address: string;
  type: string;
  description: string;
  price: string;
  bedrooms: number;
  bathrooms:number;
  galleries: PropertyGallery[];
  reviews: PropertyReview[];
  amenities?: Amenities[];
  created_at: string;
}
