export const getFullName = (firstName: string, lastName: string) => {
  if (!firstName && !lastName) {
    return 'Pending User'
  }

  if (!firstName) {
    return lastName
  }

  if (!lastName) {
    return firstName
  }

  return `${firstName} ${lastName}`
}
