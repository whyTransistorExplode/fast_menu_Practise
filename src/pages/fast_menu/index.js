import React, {Component} from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {Image} from "react-bootstrap";
import img_burger from "../../assets/img_burger.png";
import img_pizza from "../../assets/img_pizza.png";
import img_hotdog from "../../assets/img_hotdog.png";
import img_sandwich from "../../assets/img_sandwich.png";
import img_cursor from "../../assets/selection_cursor.png";
import {connect} from "dva";
import OrderTemplate from "@/pages/OrderTemplate";
import {foods, size} from "../../constants/constants";

@connect(({globalModel}) => ({globalModel}))
class FastMenu extends Component {


  componentDidMount() {
  }

  render() {
    const {dispatch} = this.props;
    const {globalModel} = this.props;

    let a = false, b = false, c = false;
    let indexOFdiv = 0;

    const openMenu = () => {
      for (const elementsByClassNameElement of document.getElementsByClassName("groupOfdivImgs")) {
        elementsByClassNameElement.style.opacity = "100%";
        elementsByClassNameElement.style.transform = "translate(0,0)";
      }
      document.getElementById('selection_cursor').style.display = 'block'

    };

    const moveCursor = (i, target_id) => {
      if (document.getElementById('selection_cursor').style.display === '')
        return;
      indexOFdiv = i;
      const a = `${(i * document.getElementById(target_id).offsetWidth)}px`;
      document.getElementById('selection_cursor').style.opacity = '1';
      document.getElementById('selection_cursor').style.transform =
        `translate(${a},0`;
    };
    const mouseEnter = (v) => {
      switch (v.currentTarget.id) {
        case 'div_burger':
          moveCursor(0, v.currentTarget.id);
          break;
        case 'div_hotdog':
          moveCursor(1, v.currentTarget.id);
          break;
        case 'div_pizza':
          moveCursor(2, v.currentTarget.id);
          break;
        case 'div_sandwich':
          moveCursor(3, v.currentTarget.id);
          break;
        default:
          break;
      }

      if (v.currentTarget.id === 'selection_cursor')
        c = true; else if (v.currentTarget.id !== 'food_row') {
        a = true;
      } else {
        b = true;
      }
      if (!a && !b && !c) {
        document.getElementById('selection_cursor').style.opacity = '0';
      } else {
        document.getElementById('selection_cursor').style.opacity = '1';

      }
    };
    const mouseOut = (event) => {
      if (event.currentTarget.id === 'selection_cursor')
        c = false; else if (event.currentTarget.id !== 'food_row') {
        a = false;
      } else {
        b = false;
      }
      // console.log('on mouseout  a:b:c = '+a+'  '+ b + '  ' +c)
      if (!a && !b && !c) {
        document.getElementById('selection_cursor').style.opacity = '0';
      } else {
        document.getElementById('selection_cursor').style.opacity = '1';

      }
    };

    const mouseclick = () => {
      let price= foods[indexOFdiv];

      // console.log(Number.isNaN(globalModel.lastid)+'  '+ globalModel.lastid);
      let newTemplate = {
        id: globalModel.lastid,
        foodIndex: indexOFdiv,
        price: price,
        amount: 1,
        size: size.MEDIUM,
      }
      let newArr = globalModel.orderList;
      newArr.unshift(newTemplate);
      // console.log('clicked' + indexOFdiv);
      dispatch({
        type: 'globalModel/updateState',
        payload: {
          orderList: newArr,
          lastid: globalModel.lastid+1
        }
      })

    };

    const printBill = (v) => {
      if (globalModel.orderList.length > 0) {
        var relativediv = document.getElementById('printbill-relative-div');
        relativediv.style.animationName = 'animcheck';
        relativediv.style.animationDuration = '2s';

        relativediv
          .addEventListener('animationend',(t)=>{
            // console.log('tugadi')
            relativediv.style.transform = 'scale(1)';
            document.getElementById('printbillButton').innerText = ' Printing! '

            relativediv.style.height = (document.getElementById('printbill-absolute-div').offsetHeight)+'px';
            relativediv.addEventListener('transitionend',()=>{
              document.getElementById('printbillButton').innerText = ' done! '
            },false);

          },false)
        //

      }
    };
    return (
      <div>
        <Container className='pb-5'>

          <Row className='pt-md-5 mt-md-2'>
            <Col className='col-md-6 offset-md-3'>
              <Row className="py-3"><Col md={6} className="offset-3 mx-auto justify-content-center d-flex">
                <div onClick={openMenu} className="w-75 cursor_pointer">
                  <h4 className="text-center subject_orange">FAST MENU</h4></div>
              </Col></Row>
            </Col>
          </Row>
          <Row className="pt-md-3 mt-md-2">
            <Col className="col-md-6 offset-md-3">
              <Row className="mt-md-1 position-relative" id='food_row' onMouseOut={mouseOut} onMouseOver={mouseEnter}>

                <Col className=" text-center col-md-3 p-0">
                  <div onMouseOver={mouseEnter} onMouseOut={mouseOut} className="p-md-4 tran opacity-0 groupOfdivImgs"
                       style={{transform: 'translate(-169px,169px)'}} id="div_burger"><Image src={img_burger} fluid/>
                  </div>
                </Col>
                <Col className=" text-center col-md-3 p-0">
                  <div onMouseOver={mouseEnter} onMouseOut={mouseOut} className="p-md-4 tran opacity-0 groupOfdivImgs"
                       style={{transform: 'translate(-90px,169px)'}} id="div_hotdog"><Image src={img_hotdog} fluid/>
                  </div>
                </Col>
                <Col className=" text-center col-md-3 p-0">
                  <div onMouseOver={mouseEnter} onMouseOut={mouseOut} className="p-md-4 tran opacity-0 groupOfdivImgs"
                       style={{transform: 'translate(90px,169px)'}} id="div_pizza"><Image src={img_pizza} fluid/></div>
                </Col>
                <Col className=" text-center col-md-3 p-0">
                  <div onMouseOver={mouseEnter} onMouseOut={mouseOut} className="p-md-4 tran opacity-0 groupOfdivImgs"
                       style={{transform: 'translate(169px,169px)'}} id="div_sandwich"><Image src={img_sandwich} fluid/>
                  </div>
                </Col>
                <div onClick={mouseclick} id="selection_cursor" onMouseOver={mouseEnter} onMouseOut={mouseOut}
                     className='col col-md-3 p-0 tran selection_cursor'><div><Image src={img_cursor}/></div></div>

              </Row>


              <Row>
                {globalModel.orderList.map((item, i) =>
                  <OrderTemplate key={item.id} item={item} index={i}/>
                )}
              </Row>

              <Row>
                <Col className={'col-md-4 offset-4 mt-md-3 '+(globalModel.orderList.length>0?'opacity-1':'opacity-0')}>
                  <div className='w-100 d-flex justify-content-between'>
                    <span>Total: {globalModel.orderList.length>0?globalModel.orderList.map(item => item.amount).reduce((a,b)=>a+b):''}</span>
                    <span>Price: {globalModel.orderList.length>0?globalModel.orderList.map(item => item.amount*
                      (item.size===size.SMALL?item.price.small:item.size===size.MEDIUM?item.price.medium:
                        item.size===size.LARGE?item.price.large:'0')).reduce((a,b)=>a+b):''}$</span></div>
                  <div id='printbillButton' className="text-center p-1 printbill-button cursor_pointer w-75 mx-auto" onClick={printBill}>Print bill</div>
                </Col>
              </Row>
              <Row>
                <Col className=' col-md-8 offset-2'>
                  {/*relative div*/}
                  <div id='printbill-relative-div' style={{height:'0px'}}
                       className={'w-100 border border-dark printbill-relative-div ' + (globalModel.orderList.length>0?'opacity-1':'opacity-0')}>

                    {/*absoulte div*/}
                    <div id='printbill-absolute-div' className='printbill-absolute-div'>

                      <div className='border-bottom-dashed'><p className='text-center'>FAST MENU  – Uzbekistan</p></div>
                    <Table borderless>
                      <tbody>

                      {globalModel.orderList.length>0?globalModel.orderList.map(item=>
                        <tr key={item.id} className='border-bottom-solid'>
                          <td className='py-2 '><div className='border-right-dotted px-1'>{item.price.name}</div></td>
                          <td className='py-2 '><div className='border-right-dotted px-1'>
                            {item.size === size.SMALL?'Small':item.size === size.MEDIUM?'Medium':
                            item.size === size.LARGE?'Large':''}
                            </div></td>
                          <td className='py-2 text-right'><div className='border-right-dotted px-1'>{item.amount}</div></td>
                          <td className='py-2 text-right'><div className='px-1'>{item.amount*
                          (item.size===size.SMALL?item.price.small:
                            item.size===size.MEDIUM?item.price.medium:
                              item.size===size.LARGE?item.price.large:0)
                          }$</div></td>
                        </tr>
                      ):''}
                      <tr>
                        <td className='py-2 '><div className='border-right-dotted px-1'>Total </div></td>
                        <td className='py-2 '><div className='border-right-dotted px-1 w-100' style={{height:'24px'}}>  </div></td>
                        <td className='py-2 text-right'><div className='border-right-dotted px-1'>
                          {globalModel.orderList.length>0?globalModel.orderList.map(item => item.amount).reduce((a,b)=>a+b):''}
                        </div></td>
                        <td className='py-2 text-right'><div className='px-1'>{globalModel.orderList.length>0?globalModel.orderList.map(item => item.amount*
                          (item.size===size.SMALL?item.price.small:item.size===size.MEDIUM?item.price.medium:
                            item.size===size.LARGE?item.price.large:'0')).reduce((a,b)=>a+b):''}$</div></td>
                      </tr>

                      </tbody>
                    </Table>

                      <div className='border-top-dashed text-center pt-md-3'>
                        <p>Service Not Included! <br/> Thank You!</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>
        </Container>

      </div>
    );

  }


}

FastMenu.propTypes = {};

export default FastMenu;
