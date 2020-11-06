//import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = theme =>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit*3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  }
})

// const customers=[ //하드코딩된 데이터들은 node서버에 담아주면 된다.
//   {
//     'id':1,
//     'image':'https://placeimg.com/64/64/any',
//     'name':'홍길동',
//     'birthday':'961222',
//     'gender':'male',
//     'job':'학생'
//   },
//   {
//     'id':2,
//     'image':'https://placeimg.com/64/64/1',
//     'name':'홍감',
//     'birthday':'022222',
//     'gender':'female',
//     'job':'프로그래머'
//   },
//   {
//     'id':3,
//     'image':'https://placeimg.com/64/64/2',
//     'name':'홍구',
//     'birthday':'920511',
//     'gender':'male',
//     'job':'해커'
//   } 
// ]

class App extends Component{

  state={
    customers:""
  }

  componentDidMount(){ //서버에 접근해서 데이터를 가져오는 함수
    this.callApi()
      .then(res=> this.setState({customers : res})) //callApi함수를 불러오면 res라는 변수에 customers정보들을 넣어주는 것이다.messages
      .catch(err => console.log(err));
  }

  callApi = async() =>{
    //const response=await fetch('/api/customers');
    const response=await fetch('/api/customers');
    const body= await response.json();
    return body;
  }

  render(){
    const { classes }= this.props;
    return (
      //데이터가 2개 이상이므로 <div>로 묶어준다.
      // <div> 
      //   {/* <Customer
      //     id={customers[0].id}
      //     image={customers[0].image}
      //     name={customers[0].name} //전달받은 props를 이용해서 출력하면 된다.
      //     birthday={customers[0].birthday}
      //     gender={customers[0].gender}
      //     job={customers[0].job}
      //   />
      //   <Customer
      //     id={customers[1].id}
      //     image={customers[1].image}
      //     name={customers[1].name} //전달받은 props를 이용해서 출력하면 된다.
      //     birthday={customers[1].birthday}
      //     gender={customers[1].gender}
      //     job={customers[1].job}
      //   />
      //   <Customer
      //     id={customers[2].id}
      //     image={customers[2].image}
      //     name={customers[2].name} //전달받은 props를 이용해서 출력하면 된다.
      //     birthday={customers[2].birthday}
      //     gender={customers[2].gender}
      //     job={customers[2].job}
      //   /> */
      //  }
      //  </div>
      
      <Paper className={classes.root}>
        <Table className={classes.table}> 
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { //customers라는 정보를 하드코딩해서 customers.map으로 접근하였지만 해당 정보를 state라는 값으로 변경 되었기 때문에 this.stat를 붙여준다.
              //state라는 변수로 접근하게 변경한 후에 페이지로 접속시 에러가 난다-> 비동기식 설정방식으로 했는데 처음 state에는 customer이라는 빈 정보를 선언했고
              //state가 비어있는 상태에서 .map으로 각 데이터에 접근을 시도하기 때문에 오류가 난다. 그래서 this.state.customers ?을 넣어서 참일 때만 접속을 허용한다.
              //map 함수를 사용함으로써 특정 배열의 각 원소에 접근을 해서 어떻게 처리할 건지 명시를 함 python에도 map을 똑같이 사용함
              //map을 이용해서 다수의 정보를 출력할 때는 key props를 사용해야한다. 
              return(
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              )
              //참일때는 데이터를 제공하고 거짓일때는 ""으로 빈값을 리턴한다.
              //f12를 페이지에서 누르고 network경로에서 새로고침시 port3000번대로 네트워크가 수신되기 때문에 5000번으로 설정한 우리한테는 데이터가 안온다.

            }): ""} 
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
