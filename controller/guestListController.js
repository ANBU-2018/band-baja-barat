const mysqlConnection = require("../connection");

exports.guestList = (req, res, next) => {
  try {
    var sql = ` SELECT g.userName,concat(firstName,' ', CASE WHEN (middleName!= 'NULL') THEN middleName ELSE '' END ,' ',lastName) AS name FROM guestList g INNER JOIN user u ON g.userName = u.userName WHERE eventId = ${req.query.eventId} `;
    mysqlConnection.query(sql, (err, rows) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addGuest = (req, res, next) => {
  try {
    var sql = ` INSERT INTO guestList (eventId,userName) values(
         ${req.body.eventId},
        "${req.body.userName}"
      )`;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ status: "guest added" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGuest = (req, res, next) => {
  try {
    var sql = ` DELETE FROM guestList WHERE eventId =  ${req.body.eventId} AND userName ="${req.body.userName}" `;
    mysqlConnection.query(sql, (err) => {
      if (!err) {
        res.json({ status: "guest deleted" });
      } else {
        res.json({ error: err });
      }
    });
  } catch (err) {
    next(err);
  }
};
exports.updatePoints = (req, res, next) => {
  try {
    var oldData = [];
    mysqlConnection.query(
      `SELECT points FROM user WHERE userName="${req.body.userName}"`,
      (err, rows) => {
        if (!err) {
          console.log(req.body.points);
          oldData = rows;
          var sql = ` UPDATE user SET 
                  points = ${oldData[0].points+parseInt(req.body.points)}
                  WHERE userName = "${req.body.userName}" `;
          mysqlConnection.query(sql, (err) => {
            if (!err) {
              res.json({
                status: "success",
                message: "User Point Updated successful",
              });
            } else {
              res.json({ error: err });
            }
          });
        } else {
          res.json({ error: err });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};