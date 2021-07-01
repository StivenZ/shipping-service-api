export default class Minutos99ApiFaultError extends Error {
    faultCode: number;

    constructor(message: string, faultCode: number) {
      super(message);

      this.faultCode = faultCode;
    }
}
