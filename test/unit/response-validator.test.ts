import {validateResponse} from "../../src/client/response/validator/response.validator";
import {InvalidResponseException} from "../../src/client/response/validator/exception/invalid-response.exception";

it('Should accept response if status code is 200', async () => {

    const mockedResponse = {
        status: 200,
        json: async () => {
            return {
                'test': 'test'
            }
        }
    }


    expect(await validateResponse(mockedResponse as Response)).toStrictEqual({
        'test': 'test'
    })
});

it('Should throw an invalid request if code is higher than 299', async () => {

    const mockedResponse = {
        status: 400,
        json: async () => {
            return {
                'test': 'test'
            }
        }
    }

    let actualException = null;

    try {
        await validateResponse(mockedResponse as Response)
    } catch (exception) {
        actualException = exception;
    }

    expect(actualException).toBeInstanceOf(InvalidResponseException)
});

it('Should throw an invalid request if code is lower than 200', async () => {

    const mockedResponse = {
        status: 199,
        json: async () => {
            return {
                'test': 'test'
            }
        }
    }

    let actualException = null;

    try {
        await validateResponse(mockedResponse as Response)
    } catch (exception) {
        actualException = exception;
    }

    expect(actualException).toBeInstanceOf(InvalidResponseException)
});