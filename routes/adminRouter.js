var express = require('express');
var router = express.Router();
const {index, cargaProducto, storeProducto, detalleProducto, editarProducto, actualizarProducto, borrarProducto} = require("../controllers/adminController")
const productValidator = require('../validations/productValidator');



const upload = require("../middlewares/cargaImagen");

//listado de productos
router.get("/", index);

//crear producto
router.get("/create", cargaProducto);
router.post("/create", upload.any(),  productValidator,storeProducto);

//detalle producto
router.get("/detalle/:id",  detalleProducto);

//edicion y actualizacion de producto
router.get("/edit/:id", editarProducto);
router.put("/upload/:id",upload.any(), productValidator,actualizarProducto);

//borrar producto
router.delete("/delete/:id",  borrarProducto);

module.exports = router;