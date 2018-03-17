class Response {
    constructor(success) {
        this.success = success;
    }
}


class SuccessResponse extends Response {

    constructor(total_elements) {
        super(true);

        this.total_elements = total_elements;
    }
}


class ErrorMessage extends Response {

    constructor(error) {
        super(false);

        this.error_message = error.code;
        this.error_code = error.message;
    }
}


module.exports = { success: SuccessResponse, error: ErrorMessage };