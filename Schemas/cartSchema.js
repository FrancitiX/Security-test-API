const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: String,
    data_product: { type: String, unique: true },
    quantity: Number,
    price: Number,
    date: { date: String, time: String },
  },
  {
    collection: "carts",
  }
);

cartSchema.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("cart", cartSchema);