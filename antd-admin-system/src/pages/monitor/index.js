/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './index.less';
import Part1 from './part1';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';
import { Icon } from 'antd';
import Part2 from './midle';
import Part3 from './part3';
// import ParticlesBg from 'particles-bg';
import ReactCanvasNest from 'react-canvas-nest';

export default class Monitor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sourceUrl: '',                          // 视频url
            videoWidth: 491.42,                     // 视频界面宽度
            videoHeight: 215,                       // 视频界面高度
            videoStatus: false,                     // 视频界面是否显示
        }
    }

    // 视频界面转换到视频源选择界面（视频标题界面）
    videoStatusChange = (value) => {
        this.setState({
            videoStatus: value,
        });
    };

    // 视频源选择界面
    selectSourceUrl = (value) => {
        this.setState({
            videoStatus: true,
            sourceUrl: value
        });
    }

    render(){
        return (
            <>
            <ReactCanvasNest className = 'canvasNest' config = {{ pointColor: ' 255, 255, 255 ' }} style = {{ zIndex: 80 }} />
            <div className="monitor-body">
                <span className="monitor-header">
                    <h1 className="header-title">--微影云--数据可视化</h1>
                </span>
                <div className="monitor-wrapper">
                    <div className="monitir-content">
                        <div className="col col-l">
                            <div className="xpanel-wrapper xpanel-wrapper-40">
                                <div className="xpanel xpanel-l-t">
                                    <div className="title">part 1</div>
                                    <Part1 height={260} />
                                </div>
                            </div>
                            <div className="xpanel-wrapper xpanel-wrapper-60">
                                <div className="xpanel xpanel-l-b">
                                    <div className="title">part2</div>
                                    {/* <div style={{color: 'white'}}>测试</div> */}
                                    <Part2 height={440} />
                                </div>
                            </div>
                        </div>
                        <div className="col col-c">
                            <div className="xpanel-wrapper xpanel-wrapper-75">
                                <div className="xpanel no-bg" style={{color: 'white'}}>
                                    测试区域
                                </div>
                            </div>
                            <div className="xpanel-wrapper xpanel-wrapper-25">
                                <div className="xpanel xpanel-c-b">
                                    <div className="title title-long">part3</div>
                                    {/* <div style={{color: 'white'}}>测试</div> */}
                                    <Part3 height={230} />
                                </div>
                            </div>
                        </div>
                        <div className="col col-r">
                            <div className="xpanel-wrapper xpanel-wrapper-25">
                                <div className="xpanel xpanel-r-t">
                                    <div className="title">part4</div>
                                    <div style={{color: 'white'}}>测试</div>
                                </div>
                            </div>
                            <div className="xpanel-wrapper xpanel-wrapper-30">
                                <div className="xpanel xpanel-r-m">
                                    <div className="title">视频</div>
                                    {
                                        this.state.videoStatus?
                                        <div>
                                            <div style={{float: 'left', color:'white', marginTop: 100}}><a onClick={() => this.videoStatusChange(false)}><Icon type="double-right" /></a></div>
                                            <div style={{color: 'white', padding: '10px 10px 10px 20px'}}>
                                                <Player autoPlay={true} fluid={false} width={this.state.videoWidth} height={this.state.videoHeight} src={this.state.sourceUrl}>
                                                    <ControlBar>
                                                    <ReplayControl seconds={10} order={1.1} />
                                                    <ForwardControl seconds={30} order={1.2} />
                                                    <CurrentTimeDisplay order={4.1} />
                                                    <TimeDivider order={4.2} />
                                                    <PlaybackRateMenuButton
                                                        rates={[5, 2, 1, 0.5, 0.1]}
                                                        order={7.1}
                                                    />
                                                    <VolumeMenuButton disabled />
                                                    </ControlBar>
                                                </Player>
                                            </div>
                                        </div>:
                                        <div style={{color: 'white', padding: '10px 10px 10px 20px', width: this.state.videoWidth+30, textAlign: 'center'}}>
                                            <div style={{marginBottom: 5}}>
                                                <a onClick={() => this.selectSourceUrl("http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4")}>#######视频1######</a>
                                            </div>
                                            <div style={{marginBottom: 5}}>
                                                <a onClick={() => this.selectSourceUrl("2")}>#######视频2######</a>
                                            </div>
                                            <div>
                                                <a onClick={() => this.selectSourceUrl("3")}>#######视频3######</a>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="xpanel-wrapper xpanel-wrapper-45">
                                <div className="xpanel xpanel-r-b">
                                    <div className="title">part6</div>
                                    <div style={{color: 'white'}}>测试</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }

}