export default class ServiceError extends Error {
  public message: string;

  constructor(message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}
