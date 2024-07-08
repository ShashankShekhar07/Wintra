import React, { useContext } from 'react'
import './NewCollections.css'
// import new_collections from "../Assets/new_collections";
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  const {new_collections} = useContext(ShopContext);
  return (
    <div className="new-collections">
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
        {new_collections.map((item,i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
        </div>
    </div>
  )
}

export default NewCollections