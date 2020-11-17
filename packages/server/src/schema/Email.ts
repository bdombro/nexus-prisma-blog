import { scalarType } from "@nexus/schema";

export const Email = scalarType({
  name: 'Email',
  asNexusMethod: 'email',
  description: 'The Email scalar type asserts email validity',
  parseValue(value) {
    return assertEmail(value)
  },
  serialize(value) {
    return value
  },
  // parseLiteral(value) {
  //   return assertEmail(value)
  // }
})

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function assertEmail(email: string) {
  if (!validateEmail(email)) {
    throw new Error('Email is invalid')
  }
  return email.toLowerCase()
}