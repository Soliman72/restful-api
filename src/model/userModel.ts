import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String,  required: true , unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true  },
} , {timestamps : true});




// Hash Password 
userSchema.pre('save', async function (next) {
  // if not modify => not hash!
  if (!this.isModified('password')) {
    return next();
  }
  // hash
  this.password = await bcrypt.hash(this.password, 12);
  return next();
})

// compare 
userSchema.methods.comparePassword = async function (candidatePassword: string)
  : Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
}




const User = mongoose.model('User', userSchema);
export default User;