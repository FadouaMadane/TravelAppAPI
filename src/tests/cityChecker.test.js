// This passes because 1 === 1
it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
});

import { validCITY } from "../client/js/cityChecker";

describe(validCITY, () => {
    test("it should return false if the city equal to null", () => {
        expect(validCITY('rabat')).not.toBeNull();
    });
});