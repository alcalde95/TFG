import z from 'zod'

const userSchema = z.object({
  email: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  }),
  password: z.string().min(6),
  role: z.enum(['a', 'i', 'c', 'A', 'I', 'C'], {
    invalid_type_error: 'Role must be a, i or c'
  })
})

const partialUserSchema = z.object({
  email: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  }),
  password: z.string().min(6)
})

export const validateUser = ({ input }) => {
  return userSchema.safeParse(input)
}

export const partialValidateUser = ({ input }) => {
  return partialUserSchema.safeParse(input)
}
