// We create this to get extra information about error , not only message error

export class AppError extends Error {
  constructor(
    public readonly name: string,
    public readonly httpCode: number,
    errorMsg?: string,
    public readonly isOperational?: boolean,
    public readonly errors?: {}
  ) {
    super(errorMsg);

    Error.captureStackTrace(this);
  }
}
