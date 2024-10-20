// import mongoose from "mongoose";

// // User Config
// const UserSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   authentication: {
//     password: { type: String, required: true, select: false },
//     salt: { type: String, select: false },
//     sessionToken: { type: String, select: false },
//   },
// });

// export const UserModel = mongoose.model("users", UserSchema);

// // User Actions
// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// export const getUserBySessionToken = (sessionToken: string) =>
//   UserModel.findOne({ "authentication.sessionToken": sessionToken });
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) =>
//   new UserModel(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) =>
//   UserModel.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) =>
//   UserModel.findByIdAndUpdate(id, values);


import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename '_id' to 'id'
        delete ret._id;   // Remove the '_id' property
      },
    },
  }
);

export const UserModel = mongoose.model("users", UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
