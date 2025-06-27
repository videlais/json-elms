import { validate } from "../src/validate.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe('validate', () => {
    it('should throw an error if filePath is not a string', () => {
        assert.rejects(async () => {
            await validate(123);
        });
    });

    it('should throw an error if schemaPath is not a string', () => {
        assert.rejects(async () => {
            await validate('./test.json', 123);
        });
    });

    it('should throw an error if filePath is empty', () => {
        assert.rejects(async () => {
            await validate('');
        });
    });

    it('should throw an error if schemaPath is empty', () => {
        assert.rejects(async () => {
            await validate('./test.json', '');
        });
    });

    it('should throw an error if the input file does not exist', () => {
        assert.rejects(async () => {
            await validate('./nonexistent.json');
        });
    });

    it('should throw an error if the schema file does not exist', () => {
        assert.rejects(async () => {
            await validate('./test.json', './nonexistent-schema.json');
        });
    });

    it('should throw an error if the schema file is not valid JSON', () => {
        assert.rejects(async () => {
            await validate('./test.json', './test/test_files/invalid-schema.json');
        });
    });

    it('should throw an error if schema is null JSON', () => {
        assert.rejects(async () => {
            await validate('./test/test_files/null.json', './test/test_files/invalid-schema.json');
        });
    });

    it('should throw an error if parsed schema is not a valid JSON object', () => {
        assert.rejects(async () => {
            await validate('./test/test_files/valid.json', './test/test_files/number.json');
        });
    });

    it('should validate a valid JSON file against a valid schema', async () => {
        const result = await validate('./test/test_files/valid.json', '../schema/elms-schema.json');
        assert.strictEqual(result, true);
    });

    it('should validate against default parameters', async () => {
        const result = await validate('./test/test_files/valid.json');
        assert.strictEqual(result, true);
    });

    it('should return an array of error messages for an invalid JSON file', async () => {
        const result = await validate('./test/test_files/invalid.json', '../schema/elms-schema.json');
        assert.ok(Array.isArray(result));
        assert.ok(result.length > 0);
    });
});