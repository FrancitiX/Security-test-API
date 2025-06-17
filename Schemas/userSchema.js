const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: {
        name: String,
        paternal_surname: String,
        maternal_surname: String,
      },
    },
    user_name: { type: String, unique: true },
    email: { type: String, unique: true },
    cellphone: {
      type: {
        country: String,
        cellphone: String,
      },
    },
    salt: String,
    pass: String,
    type: Number,
    date: { date: String, time: String },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("users", userSchema);