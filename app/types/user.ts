import type { Address } from "./Address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
  email: string;
};

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  address: Address;
}
