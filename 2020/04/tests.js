import test from 'ava';
import { isValidPassportValue } from './index.js';
import { isValidPassport } from './index.js';

test('isValidPassport()', (t) => {
    t.true(isValidPassport('ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm'));
    t.true(isValidPassport('hcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm'));

    t.false(isValidPassport('iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929'));
    t.false(isValidPassport('hcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in'));
});

test('isValidPassportValue()', (t) => {
    t.true(isValidPassportValue('pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f'));
    t.true(isValidPassportValue('eyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'));
    t.true(isValidPassportValue('hcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022'));
    t.true(isValidPassportValue('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719'));

    t.false(isValidPassportValue('eyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926'));
    t.false(isValidPassportValue('iyr:2019\nhcl:#602927 eyr:1967 hgt:170cm\necl:grn pid:012533040 byr:1946'));
    t.false(isValidPassportValue('hcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277'));
    t.false(isValidPassportValue('hgt:59cm ecl:zzz\neyr:2038 hcl:74454a iyr:2023\npid:3556412378 byr:2007'));
});
