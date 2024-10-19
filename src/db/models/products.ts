import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Product document
interface IProduct extends Document {
  name: string;
  price: number;
}

// Create a schema for the Product
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename '_id' to 'id'
        delete ret._id; // Remove the '_id' property
      },
    },
  }
);

// Create and export the Product model
const ProductModel = mongoose.model<IProduct>('Product', productSchema);
export default ProductModel;
