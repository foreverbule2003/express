const assert = require('assert');
const {
  fileIoInit,
  DBInit,
  DBtableInit,
  DBinsert,
  DBquery,
} = require('../model');
const { get, isEmpty } = require('lodash');

let data = [];

~async function () {
  console.log('run async immf');
  const db = await DBInit();
  await db.run(DBtableInit);
  await db.all(DBquery, false, (err, table) => {
    data = [...table];
  })
}()

describe('webdriver.io page', async () => {

  it('init', () => {

  })

  it('get Url from DB', () => {
    console.log('DB data', data);

    data.map(d => {
      browser.url(d.content)
    })
    browser.pause(5000)
  })

})
