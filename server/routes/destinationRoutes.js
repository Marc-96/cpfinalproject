const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/destinationController");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", auth, role("agent", "admin"), controller.create);
router.put("/:id", auth, role("agent", "admin"), controller.update);
router.delete("/:id", auth, role("agent", "admin"), controller.remove);

module.exports = router;
