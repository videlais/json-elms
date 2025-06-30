import { Validator } from 'jsonschema';

/**
 * Based on the contents of a file passed to it, this function will validate the file
 *  against a JSON schema.
 * If the file is valid, it will return true.
 * If the file is invalid, it will return an array of error messages.
 * 
 * @param {string} inputFileContent - The input content to validate.
 * @param {string} schemaFileContent - The content of the JSON schema file.
 * @returns {Promise<boolean | string[]>} Returns `true` if valid, or an array of error messages if invalid.
 */
export async function validate(inputFileContent:string, schemaFileContent:string): Promise<boolean | string[]> {

    // Check if inputFileContent and schemaFileContent are not empty.
    if (inputFileContent.length == 0 || schemaFileContent.length == 0) {
        throw new Error('Both inputFileContent and schemaFileContent must be non-empty strings.');
    }

    // Parse the input and schema JSON strings
    const inputData = JSON.parse(inputFileContent);
    const schemaData = JSON.parse(schemaFileContent);

    // Create a Validator instance and validate the data against the schema
    const validator = new Validator();
    const validationResult = validator.validate(inputData, schemaData);

    // If there are no validation errors, return true
    if (validationResult.valid) {
        return true;
    }

    // If there are validation errors, return an array of error messages
    return validationResult.errors.map(error => error.stack);
}