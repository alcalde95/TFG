import z from 'zod'

const classSchema = z.object({
  name: z.string().min(3),
  photo: z.string(),
  description: z.string().min(3),
  maxCapacity: z.number().int().positive(),
  duration: z.number().int().positive(),
  instructorEmail: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  })
})

export const validateClass = ({ input }) => {
  return classSchema.safeParse(input)
}
