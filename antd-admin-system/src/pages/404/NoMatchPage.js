import React from 'react'
import './NoMatchPage.less'

export default class NoMatchPage extends React.Component{

    state = {
        animated: '',
    };

    enter = () => {
        this.setState({ animated: 'hinge' });
    };

    render(){
        return (
            <div className="center">
                <img
                    src='/assets/404.png'
                    alt="404"
                    className={`animated swing ${this.state.animated}`}
                    onMouseEnter={this.enter}
                />
            </div>
        );
    }

}