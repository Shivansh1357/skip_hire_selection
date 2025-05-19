// API function to fetch skip data
import axios from 'axios';
import { apiGet, formatErrorMessage } from './utils';

export interface SkipOption {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export const fetchSkipData = async (postcode: string, area?: string): Promise<SkipOption[]> => {
  try {
    // Make a real API call using our utility function
    const response = await apiGet<SkipOption[]>('/skips/by-location', {
      postcode,
      area
    });
    
    // If the API call is successful but returns no data, throw an error
    if (!response || response.length === 0) {
      throw new Error('No skip options available for this location.');
    }
    
    return response;
  } catch (error) {
    console.error("Error fetching skip data:", formatErrorMessage(error));
    throw error;
  }
};

