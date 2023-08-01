import {getCurrentTimestamp} from "../../src/shared/time/get-current-timestamp";

it('Should return current timestamp in valid format', () => {
    const currentTimestamp = getCurrentTimestamp();
    expect(currentTimestamp).toBeGreaterThan(0);
    expect(currentTimestamp).toBeLessThan(9999999999);

    //regexp exact 10 digits for currentTimestamp
    const regexp = new RegExp(/^\d{10}$/);
    expect(regexp.test(currentTimestamp.toString())).toBeTruthy();
})