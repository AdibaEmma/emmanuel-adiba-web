/**
 * Contact form contract, shared by the form and the API route so the two
 * cannot disagree about what a valid brief is.
 */

export type ContactInput = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactField = keyof ContactInput

export type ContactErrors = Partial<Record<ContactField, string>>

export const CONTACT_LIMITS: Record<ContactField, number> = {
  name: 120,
  email: 190,
  subject: 160,
  message: 5000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(input: Partial<Record<ContactField, unknown>>): {
  data: ContactInput
  errors: ContactErrors
} {
  const read = (field: ContactField) =>
    typeof input[field] === 'string' ? (input[field] as string).trim() : ''

  const data: ContactInput = {
    name: read('name'),
    email: read('email'),
    subject: read('subject'),
    message: read('message'),
  }

  const errors: ContactErrors = {}
  if (!data.name) errors.name = 'Add your name.'
  if (!data.email) errors.email = 'Add an email address so I can reply.'
  else if (!EMAIL_PATTERN.test(data.email)) errors.email = 'That email address does not look complete.'
  if (!data.subject) errors.subject = 'Add a subject — a few words is enough.'
  if (!data.message) errors.message = 'Tell me a little about the work.'

  for (const field of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    if (!errors[field] && data[field].length > CONTACT_LIMITS[field]) {
      errors[field] = `Keep this under ${CONTACT_LIMITS[field]} characters.`
    }
  }

  return { data, errors }
}
