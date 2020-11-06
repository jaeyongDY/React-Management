import React from 'react'; 

//중요!! 계층적으로 컴포넌트를 구성한다! Customer class에 계층적으로 CustomerProfile과 CustomerInfo를 나누어서 적용해준다. 데이터가 계층적으로 구성
class Customer extends React.Component{
    render(){ //항상 수행되는 내용으로서 Customer 컴포넌트를 실제 화면에 그리고자 할때 실제로 그려지는 내용이 render()에 담겨지게 된다.
        return( //데이터가 2개 이상일시에 반드시 <div>와 같은 태그로 감싸야 된다. 아니면 오류난다.
            <div> 
                <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            </div>
        )
    }
}

class CustomerProfile extends React.Component{
    render(){
        return( //alt값은 이미지에 대한 설명, 즉 속성에 대한 설명을 나타내는 것이다.
            <div>
                <img src={this.props.image} alt="profile"/> 
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer;