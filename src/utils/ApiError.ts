export default class APIError extends Error {
  public errorCode: string;

  public message: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
