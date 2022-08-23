const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Math = require('math')
const path = require('path')
//导入mysql模块
const mysql = require('mysql');
//建立与mysql数据的链接
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin12345',
  database: 'whoisdinting'
})

// 检测是否正常工作
db.query('SELECT 1', (err, results) => {
  if (err) return console.log(err.message);
  //打印ROW……证明数据库链接成功
  console.log(results);
})

//这里我需要解决一下跨域
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8080', 'http://192.168.31.35:8080']
  }
});

//返回静态资源
/* app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});  */
// 挂载静态资源
app.use(express.static(path.join(__dirname, '../room')))


/* //测试这里的信息是否公共信息
let count = 0
//经过测试，这里的数据是公共的
 */

//定义一组数据，用来发布


//随机数函数
//随机数函数，得到两数之间的随机整数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

//在这里定义一个数组，用于存储公共数据，我想这个数据存数据库中大可不必
let roomDetail = []

//定义用户头像数组
let userimg = [
  'https://img2.baidu.com/it/u=2090606195,1473750087&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=4016017873,3810764064&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=1839813024,118489649&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=939450899,2098007462&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=994568320,2526088591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=399945471,3231760012&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=2662827092,1973461665&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=93792613,3370815915&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=3341792402,3785623991&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=494',
  'https://img2.baidu.com/it/u=3172601319,785016814&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img1.baidu.com/it/u=2619174907,1579080422&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=951143974,2484199892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img0.baidu.com/it/u=2414123494,2786338780&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
  'https://img0.baidu.com/it/u=3596636266,3550539430&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://img2.baidu.com/it/u=2211365683,1163487391&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
]




io.on('connection', (socket) => {
  console.log('有一个用户连接了');


  //房间信息中添加卧底
  function addObsolete(socket, name) {
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.obsolete.push(name)
        return true
      }
    })
  }
  //广播卧底动态
  async function PlayerObsolete(socket, message = `投票结果产生`) {

    let { obsolete } = roomDetail.find(item => item.roomid === socket.data.roomid)
    const sockets = await io.in(socket.data.roomid).fetchSockets()
    const playerData = []
    sockets.forEach((item) => {
      if (obsolete.indexOf(item.data.username) === -1)
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc })
      else {
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc, isDead: true })
      }
    })
    //广播给所有人
    io.to(socket.data.roomid).emit('tips', {
      type: 'success',
      message,
      detail: 'addRoom',
      playerData
    })
  }



  //记录本局卧底
  let roomDiting = ''

  //创建房间
  socket.on('createRoom', (roomData) => {
    //判断玩家是否在多个房间
    if (socket.rooms.size >= 2) {
      socket.emit('tips', { type: 'warning', message: '您无法多次创建房间' })
      return
    }
    //解构出房间信息
    let { username, roomid, population } = roomData
    socket.join(roomData.roomid)

    //存储房间等相关信息
    roomDetail.push(
      { roomid, population, OnlinePopulation: 1, host: username, obsolete: [], voteSituation: [], whotoVote: '' }
    )

    //绑定用户信息
    socket.data = roomData
    socket.data.imgSrc = userimg[getRandomInt(0, userimg.length + 1)]

    console.log('创建且加入房间成功，当前用户已经加入的房间列表', socket.rooms);
    socket.emit("tips", { type: 'success', message: '恭喜，房间创建成功', detail: 'createRoom' });
    setTimeout(() => {
      io.to(socket.id).emit('tips', {
        type: 'primary',
        detail: 'addRoom',
        message: '您的队友马上就到，一起开心的游戏吧',
        playerData: [{ id: socket.id, username: socket.data.username, imgSrc: socket.data.imgSrc }]
      })
    }, 2600)
  })

  //加入房间
  socket.on('addRoom', async (roomData) => {
    //判断房间是否合法
    const rooms = io.of('/').adapter.rooms
    if (!rooms.has(roomData.roomid)) {
      socket.emit('tips', { type: 'danger', message: '对不起，房间不存在', detail: 'noRoom' })
      return
    }
    //判断房间是否已满
    let this_room_detail = roomDetail.find(ele => ele.roomid === roomData.roomid)//在roomDetail中找出该房间的信息
    if (this_room_detail.population <= this_room_detail.OnlinePopulation) {
      socket.emit('tips', { type: 'warning', message: '对不起，房间已满，请少侠重新来过' })
      return
    }
    //判断是否重名
    let sockets = await io.in(roomData.roomid).fetchSockets()
    //率先判断是否已经在房间中
    if (sockets.indexOf(socket) !== -1)
      return
    if (sockets.some(item => item.data.username === roomData.username)) {
      socket.emit('tips', { message: '对不起，该房间已有重名用户，请更换用户名', type: 'danger' })
      return
    }


    //记录进入房间的用户信息
    socket.data = roomData
    socket.data.imgSrc = userimg[getRandomInt(0, userimg.length + 1)]

    //加入指定房间
    socket.join(roomData.roomid)
    //在线人数加1
    this_room_detail.OnlinePopulation++
    //提取出房间内玩家信息
    let { obsolete } = roomDetail.find(item => item.roomid === socket.data.roomid)
    sockets = await io.in(roomData.roomid).fetchSockets()
    const playerData = []
    sockets.forEach((item) => {
      if (obsolete.indexOf(item.data.username) === -1)
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc })
      else {
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc, isDead: true })
      }
    })
    //广播给加入房间的单人
    io.to(socket.id).emit('clientjump')
    //广播给所有人
    io.to(roomData.roomid).emit('tips', {
      type: 'success',
      message: `${socket.data.username} 加入了房间`,
      detail: 'addRoom',
      playerData
    })
    //更改房间信息
    roomDetail = roomDetail.map(item => {
      if (item.roomid === roomData.roomid)
        return this_room_detail
      return item
    })
    console.log('当前服务器所有房间信息');
    console.log(roomDetail);
  })


  let sendedword = []//存储已经出现的数字



  //收集投票信息
  socket.on('voteForSb', (option) => {
    console.log('投票执行了', option)
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.voteSituation.push(option.name)
        return true
      }
    })
    socket.emit('WeConfirm')
    //通知玩家投票信息
    io.to(socket.data.roomid).emit('whoVote', { one: socket.data.username, to: option.name })

    let message = { voter: socket.data.username, eletor: option.name }
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.whotoVote.push(message)
        return true
      }
    })
  })

  //投票定时器
  let votetimer = null

  //发起投票
  socket.on('vote', () => {

    //通知前端禁用投票按钮
    socket.emit('forbiddenVote')

    //清空投票信息
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.whotoVote = []
        return true
      }
    })

    //清空投票数组
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.voteSituation = []
        return true
      }
    })


    io.to(socket.data.roomid).emit('tips', { message: '房主发起了投票，点击头像开始投票', type: 'success', detail: 'vote' })
    //通知插槽改变
    let n = 30;

    votetimer = setInterval(() => {
      io.to(socket.data.roomid).emit('voteBegin', {
        toall: `<span style="color:red;" >${n}s</span>后自动提交结果，未点击玩家头像视为放弃投票`
      })
      n--
      //30s已过
      if (n < 0) {
        let { voteSituation } = roomDetail.find(item => item.roomid === socket.data.roomid)
        clearInterval(votetimer)
        io.to(socket.data.roomid).emit('voteBegin', {
          toall: `投票结束`,
        })
        console.log('投票结果', voteSituation);
        //判断投票信息
        //定义中间数组
        const Arraytemp = []
        //置入不重复元素

        voteSituation.forEach((item, index) => {
          if (Arraytemp.indexOf(item) === -1)
            Arraytemp.push(item)
        })
        //定义一个计票数组
        let voteCount = []
        //判断票数最多
        Arraytemp.forEach((Aitem) => {
          let n = 0
          voteSituation.forEach((ele) => {
            if (ele === Aitem)
              n++
          })
          voteCount.push({ count: n, name: Aitem })
        })
        voteCount = voteCount.sort((a, b) => b.count - a.count)
        console.log('最终投票结果', voteCount);

        let { whotoVote } = roomDetail.find(item => socket.data.roomid === item.roomid)

        //提交投票结果
        switch (voteCount.length) {
          case 1: {
            addObsolete(socket, voteCount[0].name)
            //广播玩家身份
            io.to(socket.data.roomid).emit('playerDead', { name: voteCount[0].name, identity: roomDiting === voteCount[0].name ? '卧底' : '良民', message: whotoVote })
            PlayerObsolete(socket)
            break
          }

          default: {
            if (voteCount[0].count > voteCount[1].count) {
              addObsolete(socket, voteCount[0].name)
              //只有一名玩家被投出去的情况
              io.to(socket.data.roomid).emit('playerDead', { name: voteCount[0].name, identity: roomDiting === voteCount[0].name ? '卧底' : '良民', message: whotoVote })
              PlayerObsolete(socket)
              break
            }
            //投票无效的情况
            io.to(socket.data.roomid).emit('voteBegin', {
              toall: `<span style="color:red;" >多玩家平票，投票无效，请房主重新发起投票</span>`,
              message: whotoVote
            })
          }
        }
        // 禁用投票按钮
        io.to(socket.data.roomid).emit('WeConfirm')
        //恢复被点击的头像
        io.to(socket.data.roomid).emit('recoveryImg')
        //恢复主机发起投票按钮
        socket.emit('activeVote')
      }
      //if判断结束
    }, 1000)
  })


  //发词
  socket.on('gameBegin', async () => {
    //清空本局卧底数据
    roomDiting = ''
    if (!socket.data.isHost) {
      socket.emit('tips', { message: '对不起，您不是房主', type: 'danger' })
      return
    }

    //定义词条数目
    let numOfWord = 0

    //从数据库读取
    db.query('select * from mainwords', (err, result) => {
      if (err) return console.log(err.message);
      console.log('数据库中的词汇数量为' + result.length);
      numOfWord = result.length //获取到了词条数量
      let indexofdatabase = getRandomInt(1, numOfWord)
      while (sendedword.indexOf(indexofdatabase) !== -1) {
        indexofdatabase = getRandomInt(1, numOfWord)
      }
      sendedword.push(indexofdatabase)
      console.log('产生的卧底词汇索引为', indexofdatabase);

      //从数据库中取词
      db.query(`select * from mainwords where id=${indexofdatabase}`, async (err, result) => {
        if (err) return console.log(err.message);
        console.log(result);
        let { common, dinting } = result[0]//解构出词汇
        const sockets = await io.in(socket.data.roomid).fetchSockets()
        let max = sockets.length //这是产生卧底的代码
        let randomDigit = getRandomInt(0, max)
        console.log(randomDigit, '这是随机的卧底');
        sockets.forEach((person, index) => {
          if (index === randomDigit) {
            //给卧底发词
            console.log(index, '匹配到了本次卧底');
            roomDiting = person.data.username
            io.to(person.id).emit('receive_word', dinting)
            return
          }
          io.to(person.id).emit('receive_word', common)
        })
        let FirstSay = getRandomInt(0, max)
        //向房间内的玩家广播谁先开始
        io.to(socket.data.roomid).emit('firstsay', {
          message: `${sockets[FirstSay].data.username}率先发言`
        })
      })
    })
  })

  //离开房间
  socket.on('leaveroom', () => {
    socket.leave(socket.data.roomid)
    let roomid = socket.data.roomid
    // console.log(socket.rooms);这时候房间列表已经没有创建房间的roomid了
    socket.data.roomid = ''//将data的roomid更改
    //此处没有加await是因为下面没有异步执行
    personLeave(socket, roomid)


  })

  //重开
  socket.on('replay', () => {
    //清空isDead状态
    //清空存储的卧底信息
    roomDetail.some(item => {
      if (item.roomid === socket.data.roomid) {
        item.obsolete = []
        return true
      }
    })
    PlayerObsolete(socket, '房主重开了游戏')
    clearInterval(votetimer)
    //通知前端恢复玩家点击状态
    io.to(socket.data.roomid).emit('replayed')
    //通知前端恢复头像颜色
    io.to(socket.data.roomid).emit('recoveryImg')
  })

  //断开链接
  socket.on('disconnect', async () => {

    const { roomid } = socket.data
    if (!roomid)
      return
    //下面的函数是异步的，所以必须加await
    await personLeave(socket, roomid)
    /*     console.log('当前服务器的房间列表:');
        console.log(roomDetail); */

    //操作房间信息，释放资源
    if (io.of('/').adapter.rooms.size === 0) {
      roomDetail = []
    }
    console.log(roomDetail);
  });
  // 玩家离开函数
  async function personLeave(socket, roomid) {
    console.log(roomDetail);
    if (roomDetail.length === 0) {
      console.log('当前没有房间存在');
      return
    }

    //更新房间信息
    let this_room_detail = roomDetail.find(ele => ele.roomid === roomid)//在roomDetail中找出该房间的信息

    //找不到同样意味着房间不存在
    if (!this_room_detail)
      return

    //在线人数减1
    this_room_detail.OnlinePopulation--
    //更改房间信息
    roomDetail = roomDetail.map(item => {
      if (item.roomid === roomid)
        return this_room_detail
      return item
    })

    let { obsolete } = roomDetail.find(item => item.roomid === roomid)
    let sockets = await io.in(roomid).fetchSockets()
    const playerData = []
    sockets.forEach((item) => {
      if (obsolete.indexOf(item.data.username) === -1)
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc })
      else {
        playerData.push({ username: item.data.username, id: item.id, imgSrc: item.data.imgSrc, isDead: true })
      }
    })
    io.to(roomid).emit("tips", {
      type: 'danger',
      message: socket.data.username + '离开了房间',
      detail: 'addRoom',
      playerData
    })

  }

  //测试代码，测试公共数据是否独立
  setTimeout(() => {


  }, 5000)


});





server.listen(3000, () => {
  console.log('listening on *:3000');
});