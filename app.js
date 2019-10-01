
const express = require('express')
const app = express()
const port = 3000
// const fs = require('fs')
const {
  fileIoInit,
  DBInit,
  DBtableInit,
  DBinsert,
  DBquery,
} = require('./model');
const { get, isEmpty } = require('lodash');
const myFun = () => {
  console.log('qwer');
}

const FALSE = 0;
const TRUE = 1;

app.use(express.json())
app.get('/', (req, res) => {
  fileIoInit();
  const postedData = JSON.stringify(req.body);
  const postedObj = JSON.parse(postedData);
  const urls = get(postedObj, 'urls', []);
  console.log('res.body', req.body);
  // if (isEmpty(urls)) throw Error('posted data error');
  const db = DBInit();
  db.serialize(() => {
    // 如果 table 不在就建立 table
    db.run(DBtableInit);

    // create data
    urls.map(url => {
      db.run(DBinsert, [url, FALSE]);
    })
  });

  db.close();
  // fileIoInit(myFun);
  res.send('express save data success');
})

app.listen(port, () => console.log(`listening on port ${port}!`))