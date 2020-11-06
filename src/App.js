import logo from './logo.svg';
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
]

class App extends Component{
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
            {customers.map(c => {
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
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
