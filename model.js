const fs = require('fs');
const FILE_PATH = './sqlite.db';

fs.open(FILE_PATH, 'r', (err) => {
  // The file exists!
  if (err) {
    fs.writeFile(FILE_PATH, '', (err) => {
      if (err) console.log(err);
      console.log("The file was created!");
    });
  }

  startDB();
});

startDB = () => {
  const file = FILE_PATH;
  const sqlite = require('sqlite3').verbose();
  const db = new sqlite.Database(file);

  db.serialize(() => {
    // 如果 table 不在就建立 table
    db.run("CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, done BOOLEAN, created TEXT DEFAULT CURRENT_TIMESTAMP)");

    // create data
    const insert = "INSERT INTO url(content, done) VALUES(?,?)";
    db.run(insert, ["myUrl.com", "false"]);

    // query data
    const query = "SELECT id, content, done, datetime(created, 'localtime') as created FROM url";
    db.each(query, (err, row) => {
      console.log(`${row.id}: ${row.content}, ${row.done}, ${row.created}`);
    })

    // update date
    const update = "update url set content=? where content=?";
    db.run(update, ['asdf', 'myUrl.com']);

    // query updated data
    const updated = "SELECT id, content FROM url where content=?"
    db.each(updated, 'asdf', (err, row) => {
      // console.log(err);
      if (err) throw Error(err);
      console.log(`${row.id}: ${row.content}`);
    })
  })
  db.close();
}
