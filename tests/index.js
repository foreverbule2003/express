const {
  DBInit,
  DBtableInit,
  DBquery,
  DBupdate,
} = require('../model');
const { get, isEmpty } = require('lodash');

let data = [];

~async function () {
  console.log('run async immf');
  const db = await DBInit();
  await db.run(DBtableInit);
  await db.all(DBquery, (err, table) => {
    data = [...table];
  })
}()

describe('webdriver.io page', async () => {

  it('init', () => {
    // console.log('DB data', data);
    console.log('this part must exist for get DB data ');
  })

  it('get Url from DB', function () {
    console.log('DB data \n', data);
    if (isEmpty(data)) this.skip();
    data.map(d => browser.url(d.content));
    browser.pause(1000);
  })

  it('update url state', function () {
    if (isEmpty(data)) this.skip();

    ~async function () {
      console.log('almost done!!!');
      try {
        const db = await DBInit();
        await db.run(DBtableInit);
        await db.run(DBupdate, [1, 0])
      } catch (err) {
        console.log(`
        === Something Wrong !!! ====
        ${err}
        `);
      }
    }()
  })

})
