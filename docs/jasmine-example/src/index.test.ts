'use strict';

import {api, run} from 'declarative-test-structure-generator';

run(
  {
    'Object syntax': {
      // only: true,
      tests: {
        'sample test 1': {
          test: () => {
            expect(1 + 2).toEqual(3);
          }
        },
        'skipped test': {
          skip: true,
          test: () => {
            expect(1 + 2).toEqual(3);
          }
        },
        'nested test suite': {
          tests: {
            'nested test': {
              test: () => {
                expect(1 + 2).toEqual(3);
              }
            }
          }
        }
      }
    },
    'Array syntax': {
      tests: [
        {
          name: 'sample test 1',
          test: () => {
            expect(1 + 2).toEqual(3);
          }
        },
        {
          name: 'nested test suite',
          tests: {
            'nested test': {
              test: () => {
                expect(1 + 2).toEqual(3);
              }
            }
          }
        }
      ]
    },
    'Mixed syntax': {
      tests: {
        'nested test suite with array syntax': {
          tests: [
            {
              name: 'sample test 1',
              test: () => {
                expect(1 + 2).toEqual(3);
              }
            },
            {
              name: 'sample test 2',
              test: () => {
                expect(1 + 2).toEqual(3);
              }
            }
          ]
        },
        'nested test suite with object syntax': {
          tests: {
            'sample test': {
              test: () => {
                expect(1 + 2).toEqual(3);
              }
            }
          }
        }
      }
    }
  },
  {api: api.jasmine}
);
