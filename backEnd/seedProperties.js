/* to run this file run in the terminal 
    nodemon seedProperties.js
*/
require("dotenv").config()
const Property = require("./models/property.model");
const mongoose = require("mongoose");
let ObjectId = require('mongodb').ObjectId

const properties = [   
  new Property({
    name: 'Building 1 in Cairo',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    governorate: "Cairo",
    address: "Cairo 14 street",
    price: 700000,
    rentOrBuy: 'buy',
    propType: 'Apartment',
    avatar: 'images/1642736029598.png',
    gallery: [],
    agentId: new ObjectId(),
  }),
  new Property({
    name: 'Building 2 in Cairo',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    governorate: "Cairo",
    address: "Cairo 14 street",
    price: 500000,
    rentOrBuy: 'buy',
    propType: 'Apartment',
    avatar: 'images/1642957412707.jpg',
    gallery: [],
    agentId: new ObjectId(),
  }),
  new Property({
    name: 'Building 3 in Cairo',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    governorate: "Cairo",
    address: "Cairo 14 street",
    price: 1000000,
    rentOrBuy: 'buy',
    propType: 'Apartment',
    avatar: 'images/1645800755319.jpeg',
    gallery: [],
    agentId: new ObjectId(),
  })
]

console.log(process.env.DBURL);

try{
    mongoose.connect(process.env.DBURL)
}
catch(e){
    console.log(e.message)
}

let seed = async() => {
    try{
        let result = await (Property.insertMany(properties))
        if (result){
            mongoose.disconnect()
            console.log('seeding was done!')
        }
    }
    catch (e){
        console.log(e)
    }
}
seed()
