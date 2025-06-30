# Extended eLectronic Metadata Schema (ELMS) as JSON Schema

This project builds on the [Extended eLectronic Metadata Schema (ELMS) by The NEXT](https://the-next.eliterature.org/elms) with some notable changes for more generic collection usage.

* Removes the `SponsoredBy` and `FeaturedInExhibition` fields from **Version Information** section, which are The NEXT specific.
* Removes the `HighlightCategory` and `HighlightCollection` fields from **Copy Information** section, as these are designed for "highlight carousel" functionality not all collections may contain.
* Removes entire **galleryImages** section containing fields `items`, `galleryImageCaption`, `imageHighlight`, `imageThumbnail`, as these are designed for "highlight carousel" functionality not all collections may contain.
* Updates all uses of "The NEXT" to "the collection" to make language more generic.

The updated fields can be found as both [descriptive markdown](./schema/schema.md) and as [JSON schema](./schema/elms-schema.json).

A simple validator designed for use with Node.js is also included, [src/validator.ts](./src/validate.ts), along with its unit tests.

## Exports

To help other projects incorporate the JSON schema and validator, individual elements can be imported separately.

```javascript
import schema from 'json-elms/schema' with {type: 'json'};
import { validate } from 'json-elms';
```

## Code Example

```javascript
// ES Module support needed for the following lines.
import schema from 'json-elms/schema' with {type: 'json'};
import { validate } from 'json-elms';

// Absolute minimum metadata for an e-lit work.
const testData = {
    "workInformation": {
        "title": "Example E-Literature Work",
        "workId": 1,
        "workDescription": "This is a sample description of an e-literature work.",
    }
};

// Convert example data into JSON text
const testDataJson = JSON.stringify(testData, null, 2);

// Convert Schema JSON back into text.
// (This is somewhat silly, but text data cannot easily be imported.)
const schemaJson = JSON.stringify(schema, null, 2);

// Validate the test data against the schema
const validationResult = await validate(testDataJson, schemaJson);

// The validate() function returns either a boolean or string[] of errors
if (Array.isArray(validationResult)) {
  console.error("Validation failed with errors:", validationResult);
}
else {
  console.log("Validation succeeded:", validationResult);
}
```
