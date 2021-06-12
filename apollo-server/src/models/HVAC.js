import mongoose from "mongoose";

const HVACSchema = {
  Date: Date,
  Time: String,
  Name: String,
  Temperature: Number,
  hasTriggeredAC: Boolean,
  hasTriggeredHeater: Boolean,
};

export const HVAC = mongoose.model("HVAC", HVACSchema);
