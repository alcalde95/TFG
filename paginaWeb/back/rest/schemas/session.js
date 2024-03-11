import z from 'zod'

const sessionSchema = z.object({
  data_time: z.date().refine((date) => date > new Date()),
  instructorEmail: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  })
})

export const validateSession = ({ input }) => {
  return sessionSchema.safeParse(input)
}
