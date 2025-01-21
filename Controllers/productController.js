const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
require("dotenv").config();

require("./../Schemas/productSchema");
require("../Schemas/product_imageSchema");
const Product = mongoose.model("product");
const productImage = mongoose.model("product_image");

const data = (product) => {
  const firstLetter = username[0].toUpperCase();
  const lastLetter = username[username.length - 1].toUpperCase();

  const randomPart = crypto.randomBytes(10).toString("hex");

  return `${firstLetter}${lastLetter}${randomPart}`;
};

const registerProduct = async (req, res) => {
  const { name, price, description, category, tags, quantity } = req.body;
  console.log(req.body);

  const data_ID = data(name);

  try {
    await Product.create({
      name,
      data_product: data_ID,
      price,
      description,
      category,
      quantity,
      tags,
    });

    // await productImage.create({
    //   user_name: user_name,
    //   image: "",
    //   bgimage: "",
    // });

    res.status(201).json({ status: "ok", data: "Producto añadido" });
    console.log("Producto creado exitosamente");
  } catch (error) {
    console.error("error: " + error);
    res
      .status(500)
      .json({ status: "error", data: "Error interno del servidor" });
  }
};

const productData = async (req, res) => {
  const { data_product } = req.body;

  if (!data_product) {
    return res.status(401).json({ error: "Error al ver el producto!" });
  }

  try {
    Product.findOne({ data_product: data_product })
      .then((product) => {
        return res.status(200).json({ status: "ok", data: product });
      })
      .catch((err) => {
        // Manejo de errores si la promesa falla
        console.error("Error de búsqueda:", err);
        return res.status(500).send({ error: "Error interno del servidor" });
      });
  } catch (error) {
    console.error("Error we: ", error);
    return res.send({ error: error });
  }
};

const updateProduct = async (req, res) => {
  const { data_ID, name, price, description, category, quantity, tags } =
    req.body;
  try {
    await Product.updateOne(
      { data_product: data_ID },
      {
        $set: {
            name,
            price,
            description,
            category,
            quantity,
            tags,
        },
      }
    );

    res.send({ status: "ok", data: "Updated" });
  } catch (error) {
    return res.send({ error: error });
  }
};

const getAllProducts = async (req, res) => {
  let skip = parseInt(req.query.skip) || 0;

  try {
    const data = await Product.find({})
      .skip(parseInt(skip))
      .limit(parseInt(10));

    const totalDocs = await Product.countDocuments();
    const pages = {
      docs: data.length,
      totalDocs: totalDocs,
      totalPages: Math.ceil(totalDocs / 10),
    };

    res.send({ status: "200", data: data, pages: pages });
  } catch (error) {
    return res.send({ error: error });
  }
};

const deleteProducts = async (req, res) => {
  const { data_ID } = req.body;
  try {
    await productImage.deleteOne({ data_product: data_ID });
    await Product.deleteOne({ data_product: data_ID });

    res.send({ status: "ok", data: "Product Deleted" });
  } catch (error) {
    console.error("No se borro el producto");
    return res.send({ error: error });
  }
};

module.exports = {
  registerProduct,
  productData,
  updateProduct,
  getAllProducts,
  deleteProducts,
};
