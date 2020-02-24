import React from 'react';

export default class Time extends React.Component{

    state = {
        data: new Date(),
    }

    componentDidMount(){
        this.time = setInterval(() => {
            this.setState({
                data: new Date(),
            })
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.time);
    }

    render(){
        return (
            <div>
                {this.state.data.toLocaleTimeString}
            </div>
        );
    }

}