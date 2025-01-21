const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productImageSchema = new Schema(
  {
    product: String,
    data_product: { type: String, unique:true },
    image: String,
    date: { date: String, time: String },
  },
  {
    collection: "product_image",
  }
);

productImageSchema.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("product_image", productImageSchema);