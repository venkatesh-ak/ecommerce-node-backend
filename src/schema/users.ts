import { string, z } from 'zod';
export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

// export const AddressSchema = z.object({
//     lineOne: z.string(),
//     lineTwo: z.string().nullable(),
//     pincode: z.string().length(6),
//     country: z.string(),
//     city: z.string(),
// })


export const AddressSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().regex(/^\d{10}$/, 'Phone must be a 10-digit number'),
    alternatePhone: z.string().regex(/^\d{10}$/, 'Alternate phone must be a 10-digit number').optional().nullable(),

    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    locality: z.string().min(1, 'Locality is required'),
    address: z.string().min(1, 'Address is required'), // area and street
    landmark: z.string().optional().nullable(),

    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required').default('India'),

    addressType: z.enum(['Home', 'Work'], { required_error: 'Address type is required' }),
});


export const UpdateUserSchema =z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().nullable(),
    defaultBillingAddress: z.number().nullable()
});