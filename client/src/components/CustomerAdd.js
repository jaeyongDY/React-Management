import React from 'react';
import {post} from 'axios';

class CustomerAdd extends React.Component {

    constructor(props){
        super(props);
        this.state={
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        }
    }
    
    //이벤트 핸들러 함수 다시 구현해보기

    handleForSubmit=(e)=>{
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
            fileName:''
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

    render(){
        return(
            <form onSubmit={this.handleForSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지:<input type="file" name="file" file={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;