const { ifError } = require('assert');
const { resolveSoa } = require('dns');
const express=require('express');
const path=require('path');
const port= 8000 ;

const db= require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');           //specified the view of the MVC filesystem/web server architecture.
app.set('views', path.join(__dirname,'views'));     //adding the views folder to the current path (__dirname holds the current path name)
app.use(express.urlencoded());      //created a parser already present in express 

//middleware to include static files
app.use(express.static('assets'));

// var contactList=[
//     {
//         name:'Rohit',
//         phone:'1213212414'
//     },
//     {
//         name:'Aditya',
//         phone:'1235467890'
//     },
//     {
//         name:'Bhavya',
//         phone:'4444433333'
//     }
    
// ];
app.get('/',function(req,res){
    // res.send('<h1>Cool,it is running or is it?</h1>');


    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from Database');
            return;
        }
        return res.render('home',{
            title:"My Contacts List",
            contact_List: contacts
        });
    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let's play with ejs",
    });
});
//for deleting a contact
app.get('/delete-contact',function(req,res){
        //get the id form the query  in the url
        let id=req.query.id;
        
        //find the contact in the database and delete it
        Contact.findByIdAndDelete(id,function(err){
            if(err){
                console.log('erroe in deleting the database');
                return;
            }
            return res.redirect('back');
        });
        
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating a contact');
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });
});



app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("NICE! My Express server is running on port:",port);
});






