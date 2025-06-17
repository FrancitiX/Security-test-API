const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema(
  {
    image: {
        url: String,
        alt: String,
    },
    link: String,
    num: Number,
    date: { date: String, time: String },
  },
  {
    timestamps: true,
    collection: "slider",
  }
);

sliderSchema.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("users", userSchema);