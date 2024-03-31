import z from 'zod'

const sessionClassesSchema = z.object({
  dataTime: z.date(),
  uuidClass: z.string().uuid({
    invalid_type_error: 'Invalid UUID format',
    required_error: 'UUID is required'
  }),
  clientEmail: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  }),
  attend: z.boolean(),
  justified: z.boolean()
})

export const validateSessionClassesSchema = ({ input }) => {
  return sessionClassesSchema.safeParse(input)
}
