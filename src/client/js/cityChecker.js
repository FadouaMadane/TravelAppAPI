
function validCITY(city) {
    console.log("::: RUNING URL VALIDATION :::", city);

    // check if the user enter the field
    if (city === undefined || city === null) {
        alert("Please enter a valid city name");
        return false;
    } else {
        return true;
    }

}
export { validCITY }