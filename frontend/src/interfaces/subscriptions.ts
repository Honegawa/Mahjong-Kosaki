export interface SubscriptionFormData {
  firstname: string;
  lastname: string;
  EMANumber?: string | null;
  birthdate: string;
  address: string;
  postalCode: string;
  city: string;
  phone?: string | null;
  email: string;
}
