var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/**
- 获取所有的 note `GET /api/notes  req:{}  res:{stauts: 0, data: [{},{}]} {status:1,errorMsg: '失败的原因'}`
- 创建一个 note `POST /api/note/create  req:{note: 'hello world'}  res:{stauts: 0}  {status:1,errorMsg: '失败的原因'}`
- 修改一个 note `POST /api/note/edit  req:{note: 'new note', id:100}`
- 删除一个 note `POST /api/note/delete req:{id:100}`
*/

/* GET users listing. */
router.get('/notes', function (req, res, next) {
  
  var data = Note.getAll()
  res.send({status: 0, data:data})
  // console.log('/notes')
  // res.send({status: 0, data:[
  //   {id:1, text: 'aaaaaa'},
  //   {id:2, text: 'bbbbbb'}
  // ]})
});

router.post('/note/add', function (req, res, next) {
  var note = req.body.note  // 输入时候的参数
  console.log('/note/add', note)
})

router.post('/note/edit', function (req, res, next) {
  console.log('/note/edit')
})

router.post('/note/delete', function (req, res, next) {
  console.log('/note/delete')
})

module.exports = router;
