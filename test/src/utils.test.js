import expect from 'expect';
import * as utils from '../../src/utils';

describe('src/utils', () => {
  describe('#.conf', () => {
    it('should return valid config', () => {
      const config = {
        user: 'saltsev@klika-tech.com',
        pass: 'MaxTlL0EEfmD33mUATqQ',
        mapScenario2Case: {
          'User logs in with valid credentials': 1,
          'User logs with invalid credentials': 2,
          'User logs with empty fields': 5
        },
        runId: '1'
      };
      const test = { test: 'test' };
      const options = {
        reporterOptions: {
          testRail: config,
        }
      };
      const exp = {
        "mapMochaStatuses2Testrail": {
          "failed": 5,
          "passed": 1,
          "skipped": 3,
        },
        "mapScenario2Case": {
          "User logs in with valid credentials": 1,
          "User logs with empty fields": 5,
          "User logs with invalid credentials": 2,
        },
        "pass": "MaxTlL0EEfmD33mUATqQ",
        "runId": '1',
        "user": "saltsev@klika-tech.com",
      };

      expect(utils.conf(config, options)).toEqual(exp);
    });

    describe('runId parameter', () => {
      it('should be possible to replace provide runId via process.env', () => {
        const config = {
        };
        const runId = "32";
        const options = {
          reporterOptions: {
            testRail: config,
          }
        };
        process.env['TESTRAIL_TESTRUN_ID'] = runId;

        expect(utils.conf(config, options).runId).toEqual(runId);
      });

      it('should handle env runId parameter higher than config`s', () => {
        const runId = "32";
        const config = {
          runId: 4,
        };
        const options = {
          reporterOptions: {
            testRail: config,
          }
        };
        process.env['TESTRAIL_TESTRUN_ID'] = runId;
      })
    });
  });
});