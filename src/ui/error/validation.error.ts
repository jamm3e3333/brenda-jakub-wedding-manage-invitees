export class ValidationError implements Error {
  name: string;
  message: any;

  private constructor(message: any) {
    this.message = message;
    this.name = 'ValidationError';
  }

  static create(message: any) {
    return new ValidationError(message);
  }
}
