export class InvalidResponseException extends Error {
  public response: string;

  public path: string;

  constructor(message: string, response: string, path: string) {
    super(message);
    this.response = response;
    this.path = path;
  }
}
