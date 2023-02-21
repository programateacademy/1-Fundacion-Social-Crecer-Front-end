import { titleCase } from "../components/SampleTest/SampleTest";
import { isAdult } from "../components/SampleTest/SampleTest";

describe('Test functions inside SampleTest component', () => {

  describe('titleCase', () => {
    test('must return a string', () => {
      const result = titleCase('A value');
      expect(typeof result).toBe('string');
    });

    test('must return the string in title case', () => {
      expect(titleCase('my first test in react')).toBe('My First Test In React')
    });

    test('must return an empty string', () => {
      expect(titleCase('')).toBe('');
    });

    test('must return upper case', () => {
      expect(titleCase('mY Name iS dyLAN')).toBe('My Name Is Dylan');
    })
  });

  describe('isAdult', () => {
    test('must return bolean', () => {
      expect(typeof isAdult(17)).toBe('boolean');
    });

    test('must return true if age >= 18', () => {
      expect(isAdult(18)).toBeTruthy();
    });

    test('must return false if age < 18', () => {
      expect(isAdult(17)).toBeFalsy();
    })

    test('must return null if age is negative', () => {
      expect(isAdult(-18)).toBeNull();
    })

  });
}); 