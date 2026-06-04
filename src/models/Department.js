import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

DepartmentSchema.index({ title: 1 }, { unique: true });

export default mongoose.models.Department ||
  mongoose.model("Department", DepartmentSchema);
