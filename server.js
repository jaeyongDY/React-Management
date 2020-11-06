const express =require('express');
const bodyParser=require('body-parser');
const app=express();
const port = process.env.PORT ||5000;
//버전이 2이상이면 middleware를 이용해서 다시 구축해야함
//npm install http-proxy-middleware --save 또는 yarn add http-proxy-middleware 또는 yarn add http-proxy-middleware axios
//setupProxy.js파일을 만들고 필요한 정보 적어주면 된다.
//port는 f12해서도 3000대로 나오는데 우리가 설정한 proxy 5000으로 적용되어서 나오니 헷갈리지말자.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([
        {
            'id':1,
            'image':'https://placeimg.com/64/64/any',
            'name':'홍길동',
            'birthday':'961222',
            'gender':'male',
            'job':'학생'
        },
        {
            'id':2,
            'image':'https://placeimg.com/64/64/1',
            'name':'홍감',
            'birthday':'022222',
            'gender':'female',
            'job':'프로그래머'
        },
        {
            'id':3,
            'image':'https://placeimg.com/64/64/2',
            'name':'홍구',
            'birthday':'920511',
            'gender':'male',
            'job':'해커'
        } 
    ]);
})

app.listen(port,()=>console.log(`Listen on port ${port}`));