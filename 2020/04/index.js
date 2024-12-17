function extractPassportData(passport) {
    const passportFields = passport.trim().split(/\r?\n|\\n|\s+/g);
    return passportFields.reduce((fields, field) => {
        const [key, value] = field.split(':');
        fields[key] = value;
        return fields;
    }, {});
}

export function isValidPassport(passport) {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const passportFields = extractPassportData(passport);
    return requiredFields.every((field) => field in passportFields);
}

export function isValidPassportValue(passport) {
    const passportFields = extractPassportData(passport);
    const validations = {
        byr(value) {
            value = parseInt(value, 10);
            return value >= 1920 && value <= 2002;
        },
        iyr(value) {
            value = parseInt(value, 10);
            return value >= 2010 && value <= 2020;
        },
        eyr(value) {
            value = parseInt(value, 10);
            return value >= 2020 && value <= 2030;
        },
        hgt(value) {
            const number = parseInt(value, 10);
            if (value.endsWith('cm')) {
                return number >= 150 && number <= 193;
            } else if (value.endsWith('in')) {
                return number >= 59 && number <= 76;
            }
            return false;
        },
        hcl(value) {
            return /^#[0-9a-f]{6}$/.test(value);
        },
        ecl(value) {
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
        },
        pid(value) {
            return /^\d{9}$/.test(value);
        },
        cid(value) {
            return true;
        },
    };
    for (const [key, value] of Object.entries(passportFields)) {
        if (key in validations && !validations[key](value)) {
            return false;
        }
    }
    return true;
}

// https://adventofcode.com/2020/day/4
export default function main(input) {
    const passports = input.trim().split(/\r?\n{2}/g);
    // return passports.filter(isValidPassport).length;
    return passports.filter(isValidPassportValue).length;
}
