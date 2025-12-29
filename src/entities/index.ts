/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: mobileservices
 * Interface for MobileServices
 */
export interface MobileServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  estimatedDuration?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}
