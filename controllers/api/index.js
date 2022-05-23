const router = require("express").Router();

const ownerRoutes = require("./owner-routes");
const vehicleRoutes = require("./vehicle-routes");

router.use("/owners", ownerRoutes);
router.use("/vehicles", vehicleRoutes);

module.exports = router;
