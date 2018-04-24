class Response {
    constructor(success) {
        this.success = success;
    }
}


class ErrorMessage extends Response {
  constructor(error) {
    super(false);
    this.error_message = error.code;
    this.error_code = error.message;
  }
}


class SuccessResponse extends Response {
    constructor(totalElements) {
        super(true);
        this.total_elements = totalElements;
    }
}


module.exports = { success: SuccessResponse, error: ErrorMessage };
