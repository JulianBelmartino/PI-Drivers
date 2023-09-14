const { Router } = require("express");
const driversRouter = require("./driverRouter");
const teamsRouter = require("./teamsRouter");
const router = Router();

router.use("/drivers", driversRouter);
router.use("/teams", teamsRouter);

module.exports = router;
