/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './index.less';
import pathList from '../../../config/iframeConfig';

export default class Swagger extends React.Component{

    render() {
        return (
            <div className="iframe">
                <iframe
                    className="iframe"
                    sandbox="allow-scripts allow-forms allow-same-origin"
                    scrolling="auto"
                    src={pathList.swagger}
                />
            </div>
        );
    }

}