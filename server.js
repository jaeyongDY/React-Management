const express =require('express');
const bodyParser=require('body-parser'); //post 방식(1) 
const fs=require('fs'); //database.json으로부터 환경설정 정보를 얻어와야하기 때문에 fs라는 파일에 접근할 수 있는 라이브러리를 불러와야함
const app=express();
const port = process.env.PORT ||5000;
//버전이 2이상이면 middleware를 이용해서 다시 구축해야함
//npm install http-proxy-middleware --save 또는 yarn add http-proxy-middleware 또는 yarn add http-proxy-middleware axios
//setupProxy.js파일을 만들고 필요한 정보 적어주면 된다.
//port는 f12해서도 3000대로 나오는데 우리가 설정한 proxy 5000으로 적용되어서 나오니 헷갈리지말자.

//데이터베이스 연동
const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended:true})); //post 방식(2) url인코딩이 계속 적용될지 1번만 적용될지에 대해 물어봄
// 데이터 방식 : get은 어떠한 데이터를 전달해주는 방식, post는 데이터 값을 변경하는 방식

const connection=mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});

connection.connect();
const multer = require('multer'); //파일을 불러오는 라이브러리 npm install --save multer
//const { execPath } = require('process');
const upload=multer({dest:'./upload'});

app.get('/api/customers',(req,res)=>{
    connection.query(
        'SELECT * FROM CUSTOMER WHERE isDeleted = 0',
        (err,rows,fields)=>{
            res.send(rows)
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } 
        }
    );
});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
//하드코딩으로 직접 데이터를 집어넣음 => 이후 데이터베이스로 바꿈
// app.get('/api/customers',(req,res)=>{
//     res.send([
//         {
//             'id':1,
//             'image':'https://placeimg.com/64/64/any',
//             'name':'홍길동',
//             'birthday':'961222',
//             'gender':'male',
//             'job':'학생'
//         },
//         {
//             'id':2,
//             'image':'https://placeimg.com/64/64/1',
//             'name':'홍감',
//             'birthday':'022222',
//             'gender':'female',
//             'job':'프로그래머'
//         },
//         {
//             'id':3,
//             'image':'https://placeimg.com/64/64/2',
//             'name':'홍구',
//             'birthday':'920511',
//             'gender':'male',
//             'job':'해커'
//         } 
//     ]);
// })

app.use('/image',express.static('./upload'));
app.post('/api/customers',upload.single('image'),(req,res)=>{
    let sql='INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/'+req.file;
    //let image = '/image/'+req.file.filename; 차이점?
    let name=req.body.name;
    let birthday=req.body.birthday;
    let gender=req.body.gender;
    let job=req.body.job;
    let params=[image,name,birthday,gender,job];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows)
            console.log(rows)
            if(err){
                //console.log(err);
                res.status(500).send('Error');
            }
        }
    )
});

app.delete('/api/customers/:id',(req,res)=>{
    let sql='UPDATE CUSTOMER SET isDeleted =1 WHERE id=?';
    let params=[req.params.id];
    connection.query(sql,params,
        (err,rows,fields)=>{
            res.send(rows);
            if(err){
                console.log(err);
                res.status(500).send('Error');
            }
        });
})

app.listen(port,()=>console.log(`Listen on port ${port}`));
