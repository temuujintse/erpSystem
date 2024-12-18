const express = require("express");
const router = express.Router();
const otgonbaatarControllers = require("./otgonbaatar/otgonbaatarController.js");
const tseControllers = require("./tse/tseController.js");


//POST /api/products: Бараа бүтээгдэхүүн нэмэх
//GET /api/products: Бараа бүтээгдэхүүнүүдийн жагсаалт авах
//GET /api/products/:id: Бараа бүтээгдэхүүний мэдээлэл авах
//PUT /api/products/:id: Бараа бүтээгдэхүүний мэдээлэл засах
//DELETE /api/products/:id: Бараа бүтээгдэхүүнийг устгах.


// tse
router.get("/:id", tseControllers.getProduct)
router.put("/:id", tseControllers.updateProduct)
//otgonoo
router.get("/", otgonbaatarControllers.getProductList)
router.post("/", otgonbaatarControllers.addProduct)
// Ensure this is defined in route.js
router.delete("/:id", otgonbaatarControllers.deleteProduct);


module.exports = router;