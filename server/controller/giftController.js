const mysqlConnection = require("./../connection");

exports.product = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `SELECT * FROM giftshop ORDER BY price`,
      (err, rows, fields) => {
        if (!err) {
          if (rows.length == 0) res.json("Store Empty");
          else res.json({ status: "success", data: rows });
          // console.log(rows);
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.addProducts = async (req, res, next) => {
  try {
    mysqlConnection.query(
      `INSERT INTO giftshop (modelNo,price,quantity,description,image,name)`,
      (err, rows, fields) => {
        if (!err) {
          res.json(giftAdded);
          console.log(rows);
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
