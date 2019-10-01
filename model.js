const fs = require('fs');
const FILE_PATH = './sqlite.db';

const fileIoInit = (startDB) => {
  const FILE_PATH = './sqlite.db';
  fs.open(FILE_PATH, 'r', (err) => {
    // The file exists!
    if (err) {
      fs.writeFile(FILE_PATH, '', (err) => {
        if (err) console.log(err);
        console.log("The file was createdAt!");
      });
    }
    console.log('load db file success');
    // startDB();
  });
}

// fs.open(FILE_PATH, 'r', (err) => {
//   // The file exists!
//   if (err) {
//     fs.writeFile(FILE_PATH, '', (err) => {
//       if (err) console.log(err);
//       console.log("The file was createdAt!");
//     });
//   }
//   startDB();
// });

const DBInit = () => {
  const FILE_PATH = './sqlite.db';
  const sqlite = require('sqlite3').verbose();
  return new sqlite.Database(FILE_PATH);
}

const DBtableInit = "CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, done BOOLEAN, createdAt TEXT DEFAULT CURRENT_TIMESTAMP)";
const DBinsert = "INSERT INTO url(content, done) VALUES(?,?)";
// const DBquery = "SELECT id, content, done, datetime(createdAt, 'localtime') as createdAt FROM url";
const DBquery = "SELECT id, content, done, datetime(createdAt, 'localtime') as createdAt FROM url where done=0";
const DBupdate = "update url set content=? where content=?";
const DBupdated = "SELECT id, content FROM url where content=?"

startDB = () => {
  // const FILE_PATH = './sqlite.db';
  // const sqlite = require('sqlite3').verbose();
  // const db = new sqlite.Database(FILE_PATH);


  const db = DBInit();

  db.serialize(() => {
    // 如果 table 不在就建立 table
    db.run(DBtableInit);

    // create data
    db.run(DBinsert, ["myUrl.com", "false"]);

    // query data
    db.each(DBquery, (err, row) => {
      console.log(`${row.id}: ${row.content}, ${row.done}, ${row.createdAt}`);
    })

    // update date
    db.run(DBupdate, ['asdf', 'myUrl.com']);

    // query updated data
    db.each(DBupdated, 'asdf', (err, row) => {
      // console.log(err);
      if (err) throw Error(err);
      console.log(`${row.id}: ${row.content}`);
    })
  })
  db.close();
}

module.exports = {
  fileIoInit,
  DBInit,
  DBtableInit,
  DBinsert,
  DBquery,
}