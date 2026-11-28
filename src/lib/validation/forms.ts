export const INDIAN_STATES_AND_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
export const INDIAN_PINCODE_REGEX = /^[1-9]\d{5}$/;

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export function validateContactForm(data: ContactFormPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }
  return errors;
}

export interface CheckoutFormPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
}

export function validateCheckoutForm(data: CheckoutFormPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Enter your full name to continue.';
  }
  if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!INDIAN_MOBILE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (starting with 6–9).';
  }
  if (!data.address.trim() || data.address.trim().length < 5) {
    errors.address = 'Enter your complete street delivery address.';
  }
  if (!data.city.trim()) {
    errors.city = 'Enter your city or town.';
  }
  if (!data.state.trim()) {
    errors.state = 'Select your state or union territory.';
  }
  if (!INDIAN_PINCODE_REGEX.test(data.pincode.trim())) {
    errors.pincode = 'Enter a valid 6-digit Indian PIN code.';
  }
  return errors;
}
