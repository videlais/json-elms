# Extended eLectronic Metadata Schema (ELMS) as JSON Schema

This project builds on the [Extended eLectronic Metadata Schema (ELMS) by The NEXT](https://the-next.eliterature.org/elms) with some notable changes for more generic collection usage.

* Removes the `SponsoredBy` and `FeaturedInExhibition` fields from **Version Information**, which are The NEXT specific.
* Removes the `HighlightCategory` and `HighlightCollection` fields from **Copy Information**, as these are designed for "highlight carousel" functionality not all collections may contain.
* Updates all uses of "The NEXT" to "the collection" to make language more generic.

The updated fields can be found as both [descriptive markdown](./schema/schema.md) and as [JSON schema](./schema/elms-schema.json).

A simple validator designed for use with Node.js is also included, [src/validator.js](./src/validate.js), along with its unit tests.
