import { validate } from "../src/validate.js";
import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";

// Get project root directory
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __distdirt = dirname(__filename);

// Shift the __dirname up two levels to the project root
const __projectDirectory = __distdirt.split('/').slice(0, -2).join('/');

describe('validate', () => {
    // Establish test file content and schema file content
    // before the tests run to ensure the project directory is set correctly.
    const invalidSchemaFileContent = readFileSync(`${__projectDirectory}/test/test_files/invalid-schema.json`, 'utf-8');
    const validJsonFileContent = readFileSync(`${__projectDirectory}/test/test_files/valid.json`, 'utf-8');
    const invalidJsonFileContent = readFileSync(`${__projectDirectory}/test/test_files/invalid.json`, 'utf-8');
    const elmsSchemaFileContent = readFileSync(`${__projectDirectory}/schema/elms-schema.json`, 'utf-8');
    const nullJsonFileContent = readFileSync(`${__projectDirectory}/test/test_files/null.json`, 'utf-8');
    const numberJsonFileContent = readFileSync(`${__projectDirectory}/test/test_files/number.json`, 'utf-8');

    it('should throw an error if inputFileContent is empty', () => {
        assert.rejects(async () => {
            await validate('', '');
        });
    });

    it('should throw an error if schemaFileContent is empty', () => {
        assert.rejects(async () => {
            await validate('', `${invalidSchemaFileContent}`);
        });
    });

    it('should throw an error if the schema file is not valid JSON', () => {
        assert.rejects(async () => {
            await validate('./test.json', `${invalidSchemaFileContent}`);
        });
    });

    it('should throw an error if schema is null JSON', () => {
        assert.rejects(async () => {
            await validate(nullJsonFileContent, `${invalidSchemaFileContent}`);
        });
    });

    it('should throw an error if parsed schema is not a valid JSON object', () => {
        assert.rejects(async () => {
            await validate(`${validJsonFileContent}`, `${numberJsonFileContent}`);
        });
    });

    it('should validate a valid JSON file against a valid schema', async () => {
        const result = await validate(validJsonFileContent, elmsSchemaFileContent);
        assert.strictEqual(result, true);
    });

    it('should return an array of error messages for an invalid JSON file', async () => {
        const result = await validate(invalidJsonFileContent, elmsSchemaFileContent);
        assert.ok(Array.isArray(result));
        assert.ok(result.length > 0);
    });
});