import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Customer from './components/Customer';

const customers=[
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
    'job':'초등학생'
  },
  {
    'id':3,
    'image':'https://placeimg.com/64/64/2',
    'name':'홍구',
    'birthday':'920511',
    'gender':'male',
    'job':'중학생'
  } 
]

function App() {
  return (
    //데이터가 2개 이상이므로 <div>로 묶어준다.
    <div> 
      {/* <Customer
        id={customers[0].id}
        image={customers[0].image}
        name={customers[0].name} //전달받은 props를 이용해서 출력하면 된다.
        birthday={customers[0].birthday}
        gender={customers[0].gender}
        job={customers[0].job}
      />
      <Customer
        id={customers[1].id}
        image={customers[1].image}
        name={customers[1].name} //전달받은 props를 이용해서 출력하면 된다.
        birthday={customers[1].birthday}
        gender={customers[1].gender}
        job={customers[1].job}
      />
      <Customer
        id={customers[2].id}
        image={customers[2].image}
        name={customers[2].name} //전달받은 props를 이용해서 출력하면 된다.
        birthday={customers[2].birthday}
        gender={customers[2].gender}
        job={customers[2].job}
      /> */
        customers.map(c => { //map 함수를 사용함으로써 특정 배열의 각 원소에 접근을 해서 어떻게 처리할 건지 명시를 함 python에도 map을 똑같이 사용함
          //map을 이용해서 다수의 정보를 출력할 때는 key props를 사용해야한다. 
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;
