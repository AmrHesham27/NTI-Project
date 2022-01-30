const userModel = require("../../models/user.model")
const propertyModel = require("../../models/property.model")
const chatModel = require("../../models/chat.model")
const sendEmails = require("../helpers/sendEmails")
const otpGenerator = require('otp-generator')
const bcryptjs = require('bcryptjs')
const fs = require('fs')
const validator = require('validator')
var macaddress = require('macaddress');
class User {
    static addUser = async (req, res) => {
        try {
            let user = new userModel(req.body)
            // create otp and send it ,, and set the activated status of the user to false
            user.otp = otpGenerator.generate(12);
            user.activated = false
            await user.save()
            sendEmails(user.email, `${user.otp}`)
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "user was added successfully"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding user data"
            })
        }
    }
    static sendOtp = async(req,res)=>{
        try{
            if(req.user.activated) throw new Error("already active")
            req.user.otp = otpGenerator.generate(12);
            await req.user.save()
            sendEmails(req.user.email, `${req.user.otp}`)
            res.status(200).send({
                apiStatus: true,
                // for ease of development send otp in the response and remove it later
                data: req.user.otp,
                message: `otp was sent to ${req.user.email}`
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error sending otp"
            })
        }
    }
    static activateUser = async(req, res) => {
        try{
            let user = req.user
            if(req.body.otp != user.otp) throw new Error('your otp is wrong')
            user.activated = true
            user.otp = ''
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:"user was activated"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid data"})
        }
    }
    static login = async(req, res)=>{
        try{
            let user = await userModel.loginUser(req.body.email, req.body.password)
            let token = await user.generateToken()
            res.status(200).send({apiStatus:true, data:{user, token}, message:"logged in"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid data"})
        }
    }
    static logout = async(req, res)=>{
        try{
            let user = req.user
            let token = req.token
            user.tokens.filter(t => t != token)
            await user.save()
            res.status(200).send({apiStatus:true, message:"logged out successfully"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not log out"})
        }
    }
    static changePassword = async(req, res)=>{
        try{
            let user = req.user
            let oldPass = req.body.oldPass
            let newPass = req.body.newPass
            // check if old password is right
            let result = await bcryptjs.compare(oldPass, user.password)
            if (!result) throw new Error('old password is wrong')
            user.password = newPass
            await user.save()
            res.status(200).send({apiStatus:true, data:result, message:"password was changed"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not change password"})
        }
    }
    static logoutAll = async(req, res)=>{
        try{
            let user = req.user
            user.tokens = []
            await user.save()
            res.status(200).send({apiStatus:true, data:user.tokens, message:"logged out from all devices"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not log out"})
        }
    }
    static editUser = async(req, res)=>{
        try{
            let user = req.user
            let editables = ['name', 'phoneNumber']
            editables.forEach(i => {
                if(req.body[i]) user[i] = req.body[i]
            })
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:"user was edited"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not edit user"})
        }
    }
    static addAdrr = async(req, res)=>{
        try{
            let user = req.user
            let newAddr = req.body.newAddr
            user.addresses.push(newAddr)
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:"address was added"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add address"})
        }
    }

    static editAddr = async(req, res)=>{
        try{
            let user = req.user
            let addrId = req.body.addrId
            let newContent = req.body.newContent
            let newType = req.body.newType
            let isDefault = req.body.isDefault 
            // check if address exist
            let isAddr = user.addresses.findIndex(i => i._id == addrId)
            if(isAddr == -1) throw new Error('this address id does not exist')
            // update 
            if (isDefault) user.addresses.forEach(i => i.isDefault = false)
            user.addresses.forEach(i => {
                if(i._id == addrId){
                    if(newContent) i.addrContent = newContent
                    if(newType) i.addrType = newType
                    if(isDefault) i.isDefault = isDefault
                }  
            })
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:"address was edited"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not edit address"})
        }
    }
    static addImage = async(req, res) => {
        try{
            // if avatr exist delete it
            if(req.user.avatar) 
            fs.unlink(req.user.avatar, function (err) {
                if (err) throw err;
            });
            // update 
            req.user.avatar = req.file.path
            await req.user.save()
            res.status(200).send({apiStatus:true, data: req.file.path, message:"avatar was added"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not set avatar"})
        }
    }
    static me = async(req, res) => {
        res.status(200).send({apiStatus:true, data:req.user, message:"user data was fetched"})
    }
    static deleteMyAccount = async(req, res) => {
        try{
            let user = req.user
            await userModel.deleteOne({ _id: user._id });
            res.status(200).send({apiStatus:true, message:"user was deleted"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not delete this user"})
        }
    }
    // change email two steps 
    // 1
    static changeEmail = async(req, res) => {
        try{
            let user = req.user
            let newEmail = req.body.newEmail
            if(!validator.isEmail(newEmail)) throw new Error("invalid email format")
            let otp = otpGenerator.generate(12)
            user.otp = otp
            user.newEmail = newEmail
            await user.save()
            sendEmails(newEmail, `<h2>${otp}</h2>`)
            res.status(200).send({apiStatus:true, data:user, message:"otp was sent to user's email"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not send otp"})
        }
    }
    // 2
    static confirmChangeEmail = async(req, res) => {
        try{
            let user = req.user
            let otp = req.body.otp
            if(user.otp != otp) throw new Error('otp is wrong')
            user.email = user.newEmail 
            await user.save()
            res.status(200).send({apiStatus:true, message:`user email was changed to ${user.email}`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not send otp"})
        }
    }
    // two steps to retrive password
    // 1 
    static forgotPassword = async(req, res) => {
        try{ 
            let email = req.body.email
            let user = await userModel.findOne({email})
            if (!user) throw new Error('this email does not exist')
            let otp = otpGenerator.generate(12)
            user.otp = otp
            await user.save()
            // should send link to the website not localhost:3000
            // send link in respond only in development
            sendEmails(user.email, `<h2>localhost:3000/user/sendNewPassword/${otp}</h2>`)
            res.status(200).send({
                apiStatus:true, 
                data:`localhost:3000/user/sendNewPassword/${otp}`, 
                message:`otp was sent to ${user.email}`
            })
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`could not send otp`})
        }
    }
    // 2
    static sendNewPassword = async(req, res) => {
        try{
            let otp = req.params.otp
            let user = await userModel.findOne({otp})
            if(!user) throw new Error('link is not valid')
            let newPassword = req.body.newPassword
            user.password = newPassword
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:'password changed successfully'})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`could not update password`})
        }
    }
    
    static sendMssg = async(req, res) => {
        try{
            let user = req.user
            let partnerId = req.body.partnerId
            let content = req.body.content
            // does chat exist or we should create it 
            let chat = await chatModel.findOne({ firstUserId: user._id, secondUserId: partnerId })
            if(chat){
                chat.messages.push({ senderId: user._id, content })
                await chat.save()
            }
            else{
                let newChat = new chatModel({
                    messages:[{
                        senderId: user._id,
                        content
                    }],
                    firstUserId: user._id,
                    secondUserId: partnerId
                })
                await newChat.save()
            }
            res.status(200).send({apiStatus:true, message:`mssg was sent`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:user, message:`mssg was not sent`})
        }
    }
    static getMssgs = async(req, res) => {
        try{
            let user = req.user
            let partnerId = req.body.partnerId
            console.log(user._id, partnerId)
            let chat = await chatModel.findOne({ firstUserId: user._id, secondUserId: partnerId })
            if(!chat) throw new Error('could not find this chat')
            res.status(200).send({apiStatus:true, data:chat, message:`chat was fetched`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`chat was not fetched`})
        }
    }
    static showProperty = async(req, res) => {
        try{
            // 1-- get the prop
            let propertyId = req.params.id
            let prop = await propertyModel.findById(propertyId)
            if (!prop) throw new Error('could not find this property')
            // 2-- remove any macAdress created before one hour ago
            let sinceOneHour = Date.now() - 3600000
            prop.macAdressList = prop.macAdressList.filter(i => i.time > sinceOneHour)
            // 3-- add one view if mac address does not exist in the last one hour
            macaddress.one(function (err, mac) {
                if (err){ throw new Error(err.message)}
                let macExist = prop.macAdressList.findIndex(i => i.mac == mac)
                if(macExist == -1){ 
                    prop.noOfViews += 1;
                    prop.macAdressList.push({
                        time: Date.now(),
                        mac
                    })
                }
            });
            await prop.save()
            res.status(200).send({apiStatus:true, data:prop, message:`property was fetched`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`property was not fetched`})
        }
    }
    // not tested
    static search = async(req, res) => {
        try{
            // data to get from user
            let [minPrice, maxPrice] = [(req.body.minPrice || 0) , (req.body.maxPrice || Infinity)]
            let governorate = { "governorate" : req.body.governorate } 
            let rentOrBuy = req.body.rentOrBuy? { "rentOrBuy" : req.body.rentOrBuy } : {}
            let propType = req.body.propType? { "propType" : req.body.propType} : {}
            let address = req.body.address
            // check
            if(!req.body.governorate) throw new Error('user must enter governorate')
            // filter properties
            let initialData = await propertyModel.find({...governorate, ...rentOrBuy, ...propType})
            if(address) initialData = initialData.filter(i => i.address.includes(address) )
            let finalData = initialData.filter(i => ((maxPrice>i.price) && (i.price>minPrice)))
            res.status(200).send({apiStatus:true, data:finalData, message:`data was fetched`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`could not fetch data`})
        }
    }
    static AllProperties = async(req, res) => {
        try{
            let props = await propertyModel.find({})
            res.status(200).send({apiStatus:true, data:props, message:`data was fetched`})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:`data was not fetched`})
        }
    } 
    /********** client functions ***********/  
    static addFavProp = async(req, res)=>{
        try{
            let user = req.user
            let propId = req.body.propId
            let property = await propertyModel.findOne({_id:propId})
            if(!property) throw new Error('could not find this prop')
            // did user liked this property before?
            if(user.favourites.includes(propId)){ 
                res.status(200).send({apiStatus:true, data:user, message:"user already like this property"})
            }
            else {
                property.noOfFav += 1
                user.favourites.push(propId)
                await property.save()
                await user.save()
                res.status(200).send({apiStatus:true, data:propId, message:"favourite property was added"})
            }
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add favourite property"})
        }
    }
    static showAllFav = async(req, res)=>{
        try{
            let userAllFav = req.user.favourites
            res.status(200).send({apiStatus:true, data:userAllFav, message:"favourites were fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add fetch favourites"})
        }
    }
    static deleteFavProp = async(req, res)=>{
        try{
            let user = req.user
            let propId = req.params.id
            user.favourites = user.favourites.filter(i => i != propId)
            await user.save()
            res.status(200).send({apiStatus:true, data: user, message:"favourite property was deleted"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not delete favourite property"})
        }
    }
    /********** agent functions **********/
    static addProperty = async(req, res) => {
        try{ 
            let newProperty
            if(req.files){
                let allImages = Object.values(req.files)
                let avatarPath = allImages.filter(i => {return i[0]['fieldname'] == 'avatar'})[0][0]['path']
                let galleryArray = allImages.filter(i => {return i[0]['fieldname'] == 'gallery'})[0]
                let galleryPaths = galleryArray.map(i => i['path'])
                newProperty = new propertyModel({
                    ...req.body, // all text fields
                    avatar: avatarPath,
                    gallery: galleryPaths,
                    agentId: req.user._id
                })
            }
            else {
                newProperty = new propertyModel({
                    ...req.body,
                    agentId: req.user._id
                })
            }
            await newProperty.save()
            res.status(200).send({apiStatus:true, data:newProperty, message:"new property was added"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not add new property"})
        }
    }
    static deleteProperty = async(req, res)=>{
        try{
            let user = req.user
            let propId = req.params.id
            await propertyModel.deleteOne({_id:propId})
            res.status(200).send({apiStatus:true, data: user, message:"property was deleted"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not delete property"})
        }
    }
    static showMyProperties = async(req, res) => {
        try{
            let user = req.user
            await user.populate("agentProps")
            res.status(200).send({apiStatus:true, data:user.agentProps, message:"properties were fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"could not fetch properties"})
        }
    }
}
module.exports = User