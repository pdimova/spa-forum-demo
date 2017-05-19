'use strict';

const DEFAULTS = {
    MIN_USERNAME_LENGTH: 6,
    MAX_USERNAME_LENGTH: 30,
    USERNAME_CHARS: 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_.',
    USERNAME_FORBIDDEN_CHARS: /[^A-Za-z_.]/,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 30,
    PASSWORD_CHARS: 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890',
    PASSWORD_FORBIDDEN_CHARS: /[^A-Za-z0-9]/,
    MIN_COMMENT_LENGTH: 3,
    MAX_COMMENT_LENGTH: 300,
    MIN_MATERIAL_TITLE_LENGTH: 6,
    MAX_MATERIAL_TITLE_LENGTH: 30
};

function isString(value) {
    return typeof value === "string";
}

function isValidLength(value, min, max) {
    return value.length >= min && value.length <= max;
}

function areValidCharacters(value, expression) {
    return !DEFAULTS.PASSWORD_FORBIDDEN_CHARS.test(value);
}

module.exports = {
    users: {
        isValidUsername(username) {
            return isString(username) &&
                isValidLength(username, DEFAULTS.MIN_USERNAME_LENGTH, DEFAULTS.MAX_USERNAME_LENGTH) &&
                areValidCharacters(username, DEFAULTS.USERNAME_FORBIDDEN_CHARS);
        },
        isValidPassword(password) {
            return isString(password) &&
                isValidLength(password, DEFAULTS.MIN_PASSWORD_LENGTH, DEFAULTS.MAX_PASSWORD_LENGTH) &&
                areValidCharacters(password, DEFAULTS.PASSWORD_FORBIDDEN_CHARS);
        }
    },
    materials: {
        isValidTitle(title) {
            return isString(title) &&
                isValidLength(title, DEFAULTS.MIN_MATERIAL_TITLE_LENGTH, DEFAULTS.MAX_MATERIAL_TITLE_LENGTH);
        },
        isValidDescription(description) {
            return isString(description);
        },
        isValidComment(comment) {
            return isString(comment) &&
                isValidLength(comment, DEFAULTS.MIN_COMMENT_LENGTH, DEFAULTS.MAX_COMMENT_LENGTH);
        }
    }
}