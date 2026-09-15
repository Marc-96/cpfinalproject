const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/notificationController");

router.use(auth);
router.get("/", controller.getAll);
router.put("/:id/read", controller.markRead);

module.exports = router;
