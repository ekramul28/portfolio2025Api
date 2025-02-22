import { Document, Model } from "mongoose";

// The builder class is now generic and reusable for any Mongoose model
class SingleDocQueryBuilder<T extends Document> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private query: any; // Mongoose query
  private populateOptions: string[] = [];

  constructor(
    private model: Model<T>,
    private filter: Record<string, string>, // Accept a filter object
    private options: Record<string, unknown>,
  ) {
    this.query = this.model.findOne(this.filter); // Initialize with findById for the given model
  }

  // Set fields to select, accepting an array of fields
  selectFields(defaultFields: string[]) {
    const fieldsToSelect = this.options.expand
      ? "" // If 'expand' is true, select all fields
      : this.options.fields
        ? (this.options.fields as string).split(",").join(" ") // Select specified fields
        : defaultFields.join(" "); // Default fields if no 'fields' or 'expand'

    this.query = this.query.select(fieldsToSelect);
    return this;
  }

  // Add populate for specific fields, accepts multiple fields
  populate(fields: string[]) {
    if (this.options.expand) {
      this.populateOptions = fields; // Expand will populate all requested fields
    } else if (this.options.fields) {
      const requestedFields = (this.options.fields as string).split(",");
      this.populateOptions = fields.filter((field) =>
        requestedFields.includes(field),
      );
    }
    return this;
  }

  // Execute the query
  async execute(): Promise<T | null> {
    // Populate if necessary
    if (this.populateOptions.length > 0) {
      this.populateOptions.forEach((field) => {
        this.query = this.query.populate(field); // Apply population to each field
      });
    }
    return this.query.exec();
  }
}

export default SingleDocQueryBuilder;
