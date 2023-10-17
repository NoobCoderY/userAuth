import mongoose from "mongoose";
import bcrypt from "bcryptjs"



export interface UserType {
  id:string
  name: string;
  password: string;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// **********************************For hash password set*********************************/
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// **********************************For compare password*********************************/

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};



export default mongoose.model("User", UserSchema);
