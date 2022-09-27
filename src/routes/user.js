const express = require("express");
const pool = require("../helpers/database");
const router = express.Router();
const morgan = require("morgan");

/**
 * Middleware
 */
const logger = morgan("combined");


/**
 *  Get user by id from database and return it as JSON
 */
router.get("/:id", async function (req, res) {
  try {
    const sqlQuery = `SELECT * FROM usuarios WHERE idUsuario = ${req.params.id}`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * Get all users from database and return them as JSON
 * Gets the records that have the status (1) Active
 */
router.get("/", async function (req, res) {
  try {
    const sqlQuery = `SELECT nombres,apellidos,tipoDocumento,numeroDocumento FROM usuarios WHERE idEstadoUsuario = 1`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    logger(req, res, function (err) {
      if (err) return done(err);
      res.setHeader("content-type", "text/plain");
    });
    res.status(400);
  }
});

/**
 * Create a new user in the database
 */
router.post("/create", async function (req, res) {
  try {
      const sqlQuery = `INSERT INTO usuarios (nombres, apellidos, tipoDocumento, numeroDocumento) VALUES ('${req.body.nombres}', '${req.body.apellidos}', '${req.body.tipoDocumento}', '${req.body.numeroDocumento}')`;
      const rows = await pool.query(sqlQuery, req.params.id);
      res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * Update a user in the database
 */

router.put("/update/:id", async function (req, res) {
  try {
    const sqlQuery = `UPDATE usuarios SET nombres = ${req.params.nombres},apellidos = ${req.params.apellidos} WHERE idUsuario = ${req.params.id}`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
/**
 * Delete a user in the database
 * Changes the status of the record to (4) Inactive
 */

router.delete("/delete/:id", async function (req, res) {
  try {
    const sqlQuery = `UPDATE usuarios SET idEstadoUsuario = 4 WHERE idUsuario = ${req.params.id}`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;