import z from 'zod'

const sessionSchema = z.object({
  dataTime: z.date().refine((date) => date > new Date(), { invalid_date: 'Date must be older than today' }),
  uuidClass: z.string().uuid({
    invalid_type_error: 'Invalid UUID format',
    required_error: 'UUID is required'
  }),
  instructorEmail: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  })
})

const updateSessionSchema = z.object({
  dataTime: z.date(),
  uuidClass: z.string().uuid({
    invalid_type_error: 'Invalid UUID format',
    required_error: 'UUID is required'
  }),
  instructorEmail: z.string().email({
    invalid_type_error: 'Invalid email format',
    required_error: 'Email is required'
  })
})

const partialSessionSchema = z.object({
  dataTime: z.date(),
  uuidClass: z.string().uuid({
    invalid_type_error: 'Invalid UUID format',
    required_error: 'UUID is required'
  })
})

export const validateSession = ({ input }) => {
  return sessionSchema.safeParse(input)
}

export const partialValidateSession = ({ input }) => {
  return partialSessionSchema.safeParse(input)
}
export const updateValidateSession = ({ input }) => {
  return updateSessionSchema.safeParse(input)
}
