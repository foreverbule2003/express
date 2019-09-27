
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const QUEUE = 'queue.json';
const STORE = 'store.json';
app.use(express.json())
app.get('/', (req, res) => {
    // console.log(req.body)
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const urls = JSON.stringify(req.body)
    console.log(urls);
    // fs.appendFile(QUEUE, JSON.stringify(req.body), (err) => {
    //     if (err) throw err;
    //     readfile()
    //     console.log('save url params')
    // })

    //     ;

    res.send('hola')
})

readfile = () => {
    console.log('start read queue');
    const queue = fs.readFileSync(QUEUE);
    const urls = JSON.parse(queue)
    console.log(urls);
    // console.log(JSON.parse(queue)[urls]);

    // fs.readFile(QUEUE, 'utf8', (err, quere) => {
    //     console.log(JSON.parse(quere)[urls]);

    //     fs.readFile(STORE, 'utf8', (err, store) => {
    //         console.log(store);
    //         // console.log(JSON.parse(store));
    //         console.log('Merge!!!!!');
    //         // const newStore = [...store[urls], ...quere[urls]]
    //         // console.log(newStore);
    //     })

    //     // if (!err) fs.unlinkSync(QUEUE);
    // })
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))