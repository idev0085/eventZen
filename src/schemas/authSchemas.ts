import { z } from 'zod';

//! Schema for the login response
export const RequestOtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    email: z.string().email(),
    otp: z.number(),
    expired_at: z.string(),
  }),
});

//! schema for the successful OTP verification response
export const VerifyOtpResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string(),
  expires_at: z.string(),
});

//! Schema for the address object
export const AddressSchema = z.object({
  street: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  zipcode: z.string().nullable(),
});

//! Schema for the user object inside the profile response
export const UserSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  lastname: z.string().nullable(),
  full_name: z.string().nullable(),
  email: z.string().email(),
  mobile: z.string().nullable(),
  designation: z.string().nullable(),
  bio: z.string().nullable(),
  tags: z.string().nullable(),
  qr_code: z.string().nullable(),
  address: AddressSchema,
  company: z.string().nullable(),
});

//! Schema for the full /api/profile response
export const UserProfileResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    user: UserSchema,
    image_url: z.string().nullable(),
    roles: z.array(z.string()),
  }),
});

export type TUser = z.infer<typeof UserSchema>;
export type TUserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type TVerifyOtpResponse = z.infer<typeof VerifyOtpResponseSchema>;
