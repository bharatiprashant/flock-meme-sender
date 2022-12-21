const fs = require("fs");
const dbFile = "db.json";

let db = {
  users: {},
  alarms: [],
};

const readDatabase = function () {
  try {
    const stringContent = fs.readFileSync(dbFile);
    db = JSON.parse(stringContent);
  } catch (err) {
    console.log("No db found, creating %s", dbFile);
  }
};

const saveDatabase = function () {
  console.log("Saving DB");
  const stringContent = JSON.stringify(db);
  fs.writeFileSync(dbFile, stringContent);
};

readDatabase();
process.on("SIGINT", function () {
  console.log("SIGINT");
  process.exit();
});
process.on("SIGTERM", function () {
  console.log("SIGTERM");
  process.exit();
});

exports.getToken = function (userId) {
  return db.users[userId];
};
exports.saveToken = function (userId, token) {
  db.users[userId] = token;
};

exports.peekAlarm = function () {
  if (db.alarms.length > 0) {
    return db.alarms[0];
  } else {
    return null;
  }
};

exports.removeAlarm = function (alarm) {
  const index = db.alarms.indexOf(alarm);
  if (index !== -1) {
    db.alarms.splice(index, 1);
  }
};
