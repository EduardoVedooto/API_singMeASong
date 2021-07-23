class DBException extends Error {
  type: string;
  message: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
    this.message = message;
  }
}

export default DBException;