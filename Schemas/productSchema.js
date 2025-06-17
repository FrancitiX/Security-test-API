const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prodcutSchema = new Schema(
  {
    name: String,
    data_product: { type: String, unique: true },
    price: Number,
    description: String,
    features: [Object],
    rating: Number,
    category: String,
    tags: [String],
    sales: Number,
    stock: Number,
    date: { date: String, time: String },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

prodcutSchema.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("product", prodcutSchema);