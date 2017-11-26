var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/**
- 获取所有的 note `GET /api/notes  req:{}  res:{stauts: 0, data: [{},{}]} {status:1,errorMsg: '失败的原因'}`
- 创建一个 note `POST /api/note/create  req:{note: 'hello world'}  res:{stauts: 0}  {status:1,errorMsg: '失败的原因'}`
- 修改一个 note `POST /api/note/edit  req:{note: 'new note', id:100}`
- 删除一个 note `POST /api/note/delete req:{id:100}`
*/

/* GET users listing. */
router.get('/notes', function (req, res, next) {
  const opts = { raw: true };
  if (req.session && req.session.user) {
    opts.where = { uid: req.session.user.id }
  }

  Note.findAll({ raw: true }).then(notes => {
    res.send({ status: 0, data: notes })
  }).catch(err => {
    res.send({ status: 1, errorMsg: "数据库故障" })
  })

  // console.log('/notes')
  // res.send({status: 0, data:[
  //   {id:1, text: 'aaaaaa'},
  //   {id:2, text: 'bbbbbb'}
  // ]})
});

router.post('/note/add', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }
  if (!req.body.note) {
    return res.send({ status: 2, errorMsg: '内容不能是空的' })
  }
  var note = req.body.note  // 输入时候的参数
  var uid = req.session.user.id
  Note.create({ text: note, uid: uid }).then(() => {
    res.send({ status: 0 })
  }).catch(() => {
    res.send({ status: 1, errorMsg: '数据库出错' })
  })
  // console.log('/note/add', note)
})

router.post('/note/edit', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }
  var noteId = req.body.id
  var note = req.body.note
  var uid = req.session.user.id
  Note.update({ text: note }, { where: { id: noteId, uid: uid } }).then(() => {
    res.send({ status: 0 })
  }).catch(err => {
    res.send({ status: 1, errorMsg: '数据库出错' })
  })
  //console.log('/note/edit')
})

router.post('/note/delete', function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send({ status: 1, errorMsg: '请先登录' })
  }
  var noteId = req.body.id
  var uid = req.session.user.id
  Note.destroy({ where: { id: noteId, uid: uid } }).then(() => {
    res.send({ status: 0 })
  })
  console.log('/note/delete')
})

module.exports = router;
