const mongoose = require("mongoose");
const RescheuleBookingSchema = new mongoose.Schema(
  {
  


      Dateandtime:  {type:Date,
        required: true,}
    },
    // { timestamps: true }
  


);

module.exports = mongoose.model('RescheuleBooking',RescheuleBookingSchema);

// export default mongoose.model("RescheuleBooking", RescheuleBookingSchema)