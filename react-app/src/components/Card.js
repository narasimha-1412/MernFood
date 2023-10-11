import React, { useEffect, useRef, useState } from "react";

import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch=useDispatchCart()
  let data=useCart()
  
  let options=props.options
  let priceRef=useRef()
  let priceOptions=Object.keys(options)

  let [qty, setQty]=useState(1)
  let [size, setSize]=useState('')

  // const handleAddToCart=async ()=>{
  //   await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
  //   console.log(data)
  // } 
  let foodItem = props.foodItem;

  // const handleClick = () => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login")
  //   }
  // }
  // const handleQty = (e) => {
  //   setQty(e.target.value);
  // }
  // const handleOptions = (e) => {
  //   setSize(e.target.value);
  // }

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
        }
      }
      // console.log(food)
      // console.log(new Date())
      if (food.length!=0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size})
          // console.log("Size different so simply ADD one more to the list")
          return
        }
        return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  let finalPrice=qty*parseInt(options[size])


  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxWidth: "360px" }}>
        <img src={props.foodItem.img} style={{'height':"160px", 'objectFit':"fill"}} className="card-img-top" alt="no img" />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">Card desc.</p> */}
          <div className="container w-100">
            <select className="m-2 h-100 bg-danger rounded" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (_, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-danger rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
          </div>
          <hr></hr>
          <button className="btn btn-danger justif-content-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
