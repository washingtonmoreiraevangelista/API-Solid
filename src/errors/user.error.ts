export class UserError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}