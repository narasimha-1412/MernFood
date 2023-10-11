import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {

  const [search,setSearch]=useState([])

  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])

  const loadData=async()=>{
    let response= await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    response=await response.json()

    // console.log(response[0], response[1])

    setFoodItem(response[0])
    setFoodCat(response[1])

  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
        <div>
            <Navbar/>
        </div>

        {/* <div style={{'marginTop': '77px'}}><Carousel/></div> */}
        <div style={{'marginTop': '77px'}}>
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">

              <div className='carousel-caption' style={{zIndex:'2'}}>
              <div class="d-flex justify-content-center" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                  {/* <button class="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
              </div>
              </div>

              <div className="carousel-item active">  
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{height: '551px'}} alt="..."/>
              </div>
              <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." style={{height: '551px'}}/>
              </div>
              <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?biryani" className="d-block w-100" alt="..." style={{height: '551px'}}/>
              </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
         </div>
        </div>

        <div className='container'>
          {foodCat.length !== 0 ? foodCat.map((data) => (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr/>
                {foodItem.length !== 0 ? foodItem.filter ((item)=>
                  (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleString())))
                  .map(filterItems=>{
                    return(
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'><Card foodItem={filterItems} options={filterItems.options[0]} /></div>

                      // <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'><Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img}/></div>
                    )
                  })
                : <div>No such data</div>}
              </div>
            )) : <div></div>
          }

          {/* <Card/> */}
        </div>

        <div>
            <Footer/>
        </div>
    </div>
  )
}
