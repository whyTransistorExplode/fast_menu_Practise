import React, {Component} from 'react';
import {connect} from "react-redux";
import {size} from "../../constants/constants";


@connect(({globalModel})=>({globalModel}))
class OrderTemplate extends Component {



componentDidMount(){
  const {globalModel,dispatch,item,index} = this.props;
  if (index === 0) {
    document.getElementById('template-row'+item.id).style = '  opacity: 0!important;\n' +
      '  height: 0!important; margin:0;\n'

    setTimeout(function () {
      document.getElementById('template-row'+item.id).style = '  opacity: 0.8!important;\n' +
        '  height: 150px!important; margin:5px 0;\n'

    },80)
  }
}

  render() {
 const {globalModel,dispatch,item,index} = this.props;

    const mouseclick = (v,sizeOfFood) => {
      let newArr = globalModel.orderList;
      newArr[index].size = sizeOfFood;
      dispatch({
        type:'globalModel/updateState',
        payload:{
          orderList: newArr
        }
      })
    };

 const incrementAmount = (v) =>{

   let newArr = globalModel.orderList;
   if(v.target.id === 'positive'){
     newArr[index].amount += +1;
   }else{newArr[index].amount += -1;}

   if (newArr[index].amount === 0)
   {
     document.getElementById('template-row'+item.id).style = 'height: 0!important; margin:0; opacity:0!important;';
     var b = document.getElementById('template-row'+item.id);

     b.addEventListener('transitionend',()=> {
       let arr = globalModel.orderList;
       let newarr2 = [];
       let arr2Index = 0;
       for (let i = 0; i < arr.length;i++){
         if (i === index) continue;
         newarr2[arr2Index++] = arr[i];
       }
       dispatch({
         type:'globalModel/updateState',
         payload:{
           orderList:newarr2
         }
       });
     },false);


   }
 else {
     dispatch({
       type: 'globalModel/updateState',
       payload: {
         orderList: newArr
       }
     });

   }
 };

    return (
      <div key={item.id} id={'template-row'+item.id} className={'w-100 d-flex '+(globalModel.orderList[index].foodIndex===0?'bg-burger':
          globalModel.orderList[index].foodIndex===1?'bg-hotdog':
            globalModel.orderList[index].foodIndex===2?'bg-pizza':
              globalModel.orderList[index].foodIndex===3?'bg-sandwich':''
      )+(index === 0?' first-upload-before ':'')}>
       <div className='d-flex h-100 w-50 text-center'>
         <div className='w-50'>
           <div style={{height:'40%'}} className='w-100 p-1'><div id={'dv1'+item.id} onClick={(v)=>{mouseclick(v,size.SMALL)}}
className={'carvedbutton '+ (globalModel.orderList[index].size === size.SMALL?'carvedbuttonOnPressed':'')}>Small</div></div>
           <div style={{height:'60%'}} className='w-100 p-1'><div id={'dv2'+item.id} onClick={(v)=>{mouseclick(v,size.MEDIUM)}}
className={'carvedbutton '+ (globalModel.orderList[index].size === size.MEDIUM?'carvedbuttonOnPressed':'')}>Medium</div></div>
         </div>

         <div className='w-50 p-1'>
           <div id={'dv3'+item.id} onClick={(v)=>{mouseclick(v,size.LARGE)}}
className={'carvedbutton '+ (globalModel.orderList[index].size === size.LARGE?'carvedbuttonOnPressed':'')}>Large</div>
         </div>
       </div>
        <div className="w-50 h-100 py-5 centering-elements">
          <div  className='bg-light responsive-square mx-1'><div onClick={incrementAmount} id='negative' className='content-minus'/></div>
          <div className="mx-1 font-weight-bold h3 numberIndex ">{globalModel.orderList[index].amount}</div>
          <div className='bg-light responsive-square mx-1'><div onClick={incrementAmount} id='positive' className='content-plus'/></div>
          {/*costs*/}
          <div className="mx-1 font-weight-bold h3 numberIndex ">{globalModel.orderList[index].amount*
          (globalModel.orderList[index].size===size.SMALL?globalModel.orderList[index].price.small:
            globalModel.orderList[index].size===size.MEDIUM?globalModel.orderList[index].price.medium:
              globalModel.orderList[index].size===size.LARGE?globalModel.orderList[index].price.large:0)
          }$</div>

        </div>
      </div>
    );
  }
}

OrderTemplate.propTypes = {};

export default OrderTemplate;
