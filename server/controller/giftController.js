const mysqlConnection = require("./../connection");

exports.product = async (req, res, next) => {
  try {
    var sql = `SELECT * FROM giftshop ORDER BY price`;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json("Store Empty");
        else res.json({ status: "success", data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO giftshop (modelNo,price,quantity,description,photo,name) 
    VALUES 
    (
      "${req.body.modelNo}",
      ${req.body.price},
      ${req.body.quantity},
      "${req.body.description}",
      "${req.body.photo}",
      "${req.body.name}"
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("giftAdded");
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    var sql = ` UPDATE giftshop SET quantity=quantity+${req.body.quantity},price= ${req.body.price} WHERE modelNo = "${req.body.modelNo}"`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json(
          `${req.body.modelNo} quantity updated by ${req.body.quantity} and price is ${req.body.price} `
        );
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    var sql = `DELETE FROM giftshop WHERE modelNo="${req.body.modelNo}"`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ status: 'success', message: `${req.body.modelNo} is deleted ` });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.orderedProduct = async (req, res, next) => {
  try {
    var sql;
    if (req.query.userName == "admin") {
      sql = ` SELECT * FROM orders `;
    } else sql = ` SELECT * FROM orders WHERE userName="${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json("No order placed yet");
        else res.json({ status: "success", data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO orders (giftId,quantity,price,orderStatus,eventId,userName,orderedDate) VALUES (
      "${req.body.giftId}",
      ${req.body.quantity},
      ${req.body.price},
      "${req.body.orderStatus}",
      ${req.body.eventId},
      "${req.body.userName}",
      "${req.body.orderedDate}"
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json(`${req.body.giftId} added to order by ${req.body.userName}`);
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    var sql = ` DELETE FROM orders WHERE orderNo = ${req.query.orderNo}`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json(`orderNo ${req.query.orderNo}  order deleted`);
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.basketData = async (req, res, next) => {
  try {
    var sql = ` SELECT * FROM basket WHERE userName = "${req.query.userName}" `;
    mysqlConnection.query(sql, (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) res.json("Basket Empty");
        else res.json({ status: "Items in basket", data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addBasket = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO basket (userName,modelNo,quantity) VALUES (
      "${req.body.userName}",
      "${req.body.modelNo}",
       ${req.body.quantity}
    )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json(`${req.body.modelNo} added to basket`);
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBasket = async (req, res, next) => {
  try {
    var sql = ` UPDATE basket SET quantity=${req.body.quantity} WHERE userName ='${req.body.userName}' AND modelNo= '${req.body.modelNo}'`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("updated in basket");
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBasket = async (req, res, next) => {
  try {
    var sql = ` DELETE FROM basket WHERE userName ='${req.body.userName}' AND modelNo= '${req.body.modelNo}'`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json("removed from basket");
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.productRating = async (req, res, next) => {
  try {
    var sql = ` SELECT value FROM rating WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}" `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ message: 'success', data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
exports.allProductRating = async (req, res, next) => {
  try {
    var sql = ` SELECT modelNo FROM rating WHERE userName="${req.query.userName}"`;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ status: 'success', data: rows });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addRating = async (req, res, next) => {
  try {
    var sql = ` INSERT INTO rating (userName,modelNo,value) VALUES (
        "${req.query.userName}",
        "${req.query.modelNo}",
         ${req.body.value}
      )`;
    var sql1 = ` UPDATE giftshop SET rating = CASE rating WHEN 0 THEN ${req.body.value} ELSE rating/2 + ${req.body.value}/2 END WHERE modelNo = "${req.query.modelNo}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        mysqlConnection.query(sql1, (err) => {
          if (!err) {
            res.json(
              `${req.query.modelNo} rated ${req.body.value} by ${req.query.userName} `
            );
          } else {
            res.json(err);
          }
        });
      } else {
        res.json(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRating = async (req, res, next) => {
  try {
    mysqlConnection.query(
      ` SELECT VALUE FROM rating WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}" `,
      (err, rows) => {
        if (!err) {
          const oldRating = (req.body.value - rows[0].VALUE) / 2;
          console.log(oldRating);
          var sql = ` UPDATE rating SET value= ${req.body.value} WHERE userName="${req.query.userName}" AND modelNo="${req.query.modelNo}"`;
          var sql1 = ` UPDATE giftshop SET rating =rating+ ${oldRating} WHERE modelNo = "${req.query.modelNo}" `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              mysqlConnection.query(sql1, (err) => {
                if (!err) {
                  res.json(
                    `${req.query.modelNo} rating updated by ${req.query.userName}`
                  );
                } else {
                  res.json(err);
                }
              });
            } else {
              res.json(err);
            }
          });
        } else {
          next(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
