import { Validator } from 'jsonschema';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Based on the contents of a file passed to it, this function will validate the file
 *  against the elma-schema.json schema.
 * If the file is valid, it will return true.
 * If the file is invalid, it will return an array of error messages.
 * 
 * @param {string} filePath - The path to the file to validate.
 * @returns {Promise<boolean | string[]>} Returns `true` if valid, or an array of error messages if invalid.
 */
export async function validate(filePath, schemaPath = '../schema/elms-schema.json') {
    // Check if schemaPath or filePath are strings.
    if (typeof schemaPath !== 'string' || typeof filePath !== 'string') {
        throw new TypeError('Both schemaPath and filePath must be strings.');
    }

    // Check if filePath and schemaPath are not empty.
    if (filePath.length == 0 || schemaPath.length == 0) {
        throw new Error('Both filePath and schemaPath must be non-empty strings.');
    }

    // Check if the input file exists.
    if (fs.existsSync(filePath) == false) {
        throw new Error(`Input file does not exist: ${filePath}`);
    }

    // Resolve the schema path to an absolute path
    const schemaFilePath = resolve(__dirname, schemaPath);

    // Check if the schema file exists.
    if (fs.existsSync(schemaFilePath) == false) {
        throw new Error(`Schema file does not exist: ${schemaPath}`);
    }
   
    // Read the schema file content
    const schemaFileContent = fs.readFileSync(schemaFilePath, 'utf8');

    // Attempt to parse the schema file content as JSON
    let schema;
    try {
        schema = JSON.parse(schemaFileContent);
    } catch (error) {
        throw new Error(`Invalid schema format: ${error.message}`);
    }

    // Ensure the schema is an object
    if (typeof schema !== 'object' || schema === null) {
        throw new Error('Schema must be a valid JSON object.');
    }

    // Create a new Validator instance
    const validator = new Validator();

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the file content as JSON
    let data;
    try {
        data = JSON.parse(fileContent);
    } catch (error) {
        return [`Invalid JSON format: ${error.message}`];
    }

    // Validate the data against the schema
    const validationResult = validator.validate(data, schema);

    // If there are no validation errors, return true
    if (validationResult.valid) {
        return true;
    }

    // If there are validation errors, return an array of error messages
    return validationResult.errors.map(error => error.stack);
}