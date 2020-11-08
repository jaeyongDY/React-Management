import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme=>({
    hidden:{
        display:'none'
    }
});

class CustomerAdd extends React.Component {

    constructor(props){
        super(props);
        this.state={
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        }
    }
    
    //이벤트 핸들러 함수 다시 구현해보기

    handleFormSubmit=(e)=>{
        e.preventDefault() //데이터가 서버에 전달됨에 있어서 오류가 발생하지 않도록 하는 함수
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        })
    }

    handleFileChange=(e)=>{
        this.setState({
            file:e.target.files[0], //file중에서 => files 첫번째 값을 사용하겠다.
            fileName:e.target.value
        })
    }

    handleValueChange=(e)=>{
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    addCustomer= () => {
        const url='/api/customers';
        const formData=new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config={
            headers:{
                'content-type':'multipart/form-data' //file이 포함되어 있는 어떠한 데이터를 전송하고자 할때 웹 표준에 맞는 헤더를 추가해야 한다.
                //multipart/form-data는 전달하고자 하는 데이터에 파일이 포함되어 있을 때 설정해 주어야 한다.
            }
        }
        return post(url,formData,config);
    }

    handleClickOpen=()=>{
        this.setState({
            open:true
        });
    }

    handleClose=()=>{
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        })
    }

    render(){
        const { classes }=this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객추가하기
                </Button> 
                <Dialog open={this.state.open} onClose={this.handleClose}> 
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label><br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleForSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지:<input type="file" name="file" file={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }
}

export default withStyles(styles)(CustomerAdd);