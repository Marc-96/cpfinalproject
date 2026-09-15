const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/bookingController");

router.use(auth);
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.updateStatus);
router.delete("/:id", controller.remove);

module.exports = router;
