export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email alredy exists')
  }
}