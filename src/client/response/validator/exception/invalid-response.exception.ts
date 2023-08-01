export class InvalidResponseException extends Error {

    public response: string;

    constructor(message, response) {
        super(message);
        this.response = response;
    }

}