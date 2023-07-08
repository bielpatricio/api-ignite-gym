export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The Check-in can only be validated until 20 minutes after its creation',
    )
  }
}
