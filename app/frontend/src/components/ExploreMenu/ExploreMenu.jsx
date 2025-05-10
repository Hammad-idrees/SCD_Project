import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu=({category,setCategory})=> {
  console.log("Received props:", { category, setCategory });
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu text'>Discover a world of possibilities with our extensive range of features designed to make your experience more enjoyable and efficient. Whether you're looking for the latest updates, personalized recommendations, or browsing through a vast library of content, our platform has something for everyone. Dive into exclusive categories, enjoy seamless navigation, and uncover hidden gems tailored to your interests.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                <p>{item.menu_name}</p>
                
              </div>
              
          )
        })}
      </div>
       <hr/>
    </div>
  )
  
}

export default ExploreMenu