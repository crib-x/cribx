export class LeaseRequestError extends Error {
    constructor(
      message: string,
      public code: string,
      public statusCode: number = 400
    ) {
      super(message);
      this.name = 'LeaseRequestError';
    }
  }