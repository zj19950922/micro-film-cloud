import React from "react";
import {Modal} from "antd";

// 可控长度的随机数拼接时间戳成产唯一id
const createUniqID = length=>Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);

class AntdDragModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width?this.props.width:700
        }
        this.id = createUniqID(10);
        this.dragWrapDom = null;// 包裹拖拽元素的元素
        this.dragDom = null // 拖拽的目标元素，在Modal组件中对应class为.antd-modal的元素
        this.dragging = false; // 是否拖拽的状态标志
        this.tLeft = 0; // 
        this.tTop = 0; //   坐标轴
        //modal的左上角相对于屏幕左上角的偏移，也是拖拽原点
        this.points = [0, 0] // 拖拽原点
        this.rect = [0, 0, 0, 0] // 记录可视区宽高和拖拽元素宽高
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onContentMoseDown = this.onContentMoseDown.bind(this)
    }

    componentDidMount() {
        this.getDragDom();
    }
    
    componentDidUpdate() {
        this.getDragDom();
    }

    /*
     * 在定时器中使用原生方式来获取dom。
     * */
    getDragDom() {
        setTimeout(() => {
            // 获取唯一标示元素
            const dragWrapDom = document.getElementsByClassName(`d_${this.id}`)[0];
            if (dragWrapDom) {
                this.dragWrapDom = dragWrapDom;
                // 获取真正的拖动元素
                let dragDom = dragWrapDom.getElementsByClassName('ant-modal')[0]
                if (dragDom) {
                    this.dragDom = dragDom
                    let modalWidth = this.dragDom.offsetWidth;
                    let modalHeight = this.dragDom.offsetHeight;
                    let screenWidth = window.innerWidth
                    let screenHeight = window.innerHeight
                   //原点不是屏幕左上角，因为dragDom是相对定位，一开始水平垂直居中，所以原点是dragDom距离屏幕左上角的偏移
                    this.points = [(screenWidth - modalWidth) / 2, (screenHeight - modalHeight) / 2]
                    this.rect = [screenWidth, screenHeight, modalWidth, modalHeight]
                }
            }
        });
    };

    onMouseDown(e) {
        e.preventDefault();
        this.dragging = true; // 激活拖拽状态
        /*
        ** 实现点击后，当前浮层在最上面
        ** 将当前所有涉及可拖拽的浮层的 zIndex = 999
        ** 将当前拖拽目标的 zIndex = 1000
        **/
        const nodeList = document.getElementsByClassName("drag_modal");
        if (nodeList.length > 0) {
            Array.from(nodeList).forEach(item => {
                item.style.zIndex = 999
                if (item.previousElementSibling) {
                    item.previousElementSibling.style.zIndex = 999
                }
            });
            this.dragWrapDom.style.zIndex = 1000;
            /*
            ** 如果mask属性设置为true的话，this.dragWrapDom.previousEleme** ntSibling就是蒙层，蒙层的zIndex需要和自己的模态框同步，否**  则一个页面多个模态框点击会错乱
            */
            if (this.dragWrapDom.previousElementSibling) {
                this.dragWrapDom.previousElementSibling.style.zIndex = 1000;
            }
        }

        /*
        * getBoundingClientRect: 返回一个 DomRect 对象
        *   包含该元素的 top、right、bottom、left 值，对应的是到屏幕上方和左边的距离，单位 px
        * */
        const dragDomRect = this.dragDom.getBoundingClientRect();
        /*
        * e.clientX、e.clientY
        *   获取鼠标的坐标位置
        * */
        // 鼠标按下时和选中元素的坐标偏移,是相对于拖拽原点的
        this.tLeft = e.clientX - dragDomRect.left + this.points[0]; 
        this.tTop = e.clientY - dragDomRect.top + this.points[1];  
        this.onMouseMove(this.dragDom);
    };

    onMouseUp(e) {
        e.preventDefault();
        this.dragging = false; // 停止移动状态
        document.onmousemove = null; // 停止鼠标移动事件
    };

    onMouseMove(node) {
        document.onmousemove = e => {
            e.preventDefault();
            if (this.dragging) {
                let left = e.clientX - this.tLeft
                let top = e.clientY - this.tTop
                // 保证模态框在可视区内
                if (this.points[0] + left > 0 && this.points[0] + left + this.rect[2] < this.rect[0]) {
                    if (this.points[1] + top > 0 && this.points[1] + top + this.rect[3] < this.rect[1]) {
                        node.style.left = left + 'px';
                        node.style.top = top + 'px';
                    }
                }
            }
        };
    };
    // 点击modal的content部分也停止模态框的拖拽
    onContentMoseDown(e) {
        this.dragging = false; 
        document.onmousemove = null; 
    }


    render() {
        const {
            zIndex = 999, children, wrapClassName,
            title,
            width = this.state.width, ...otherProps
        } = this.props
        return (
            <Modal
                zIndex={zIndex}
                width={width}
                wrapClassName={`drag_modal d_${this.id} ${wrapClassName}`}
                title={
                    <div
                        className="drag_title"
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                    >
                        {title}
                    </div>
                }
                {...otherProps}
                centered={true}
            >
                <div onMouseDown={this.onContentMoseDown}>
                    {children}
                </div>
            </Modal>
        );
    }
}

export default AntdDragModal;

