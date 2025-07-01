
export const validateUsername = (str) => {
    let validators = [validateNotEmpty, validateMinCharacters];
    return validate(str, validators, "Username");
}

export const validatePassword = (str) => {
    let validators = [validateNotEmpty, validateMinCharacters];
    return validate(str, validators, "Password");
}

export const validate = (str, validators, name) => {
    let result = "";
    for (const v of validators) {
        result = v(str);
        if (result !== "") {
            return result.replace(/%s/g, name);
        }
    }
}

export const validateNotEmpty = (str) => {
    if (str.length === 0) {
        return "%s cannot be empty";
    }
    return "";
}

export const validateMinCharacters = (str) => {
    if (str.length < 3) {
        return "%s cannot be shorter than 3 characters";
    }
    return "";
}