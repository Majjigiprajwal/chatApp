const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded());

app.get('/', async (req,res)=>{
    try{
        const data = fs.readFileSync('messages.txt')
        return res.send(`<h1>Send Message</h1>${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
        <input type="text" name="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button></form>`)
    }
    catch(err){
       console.log(err);
    }
})

app.post("/",(req,res)=>{
   fs.appendFileSync('messages.txt',`${req.body.username} :${req.body.message}`)
   return res.redirect("/")
   });


app.get("/login", (req, res) => {
    const loginForm = `
      <h1>Login</h1>
      <form  onsubmit="localStorage.setItem('username', document.getElementById('username').value)" id="loginForm" action="/login" method="POST">
        <input type="text" id="username" name="message">
        <button type="submit">Login</button>
      </form>`
  
    return res.send(loginForm);
  });
  

app.post('/login',(req,res)=>{
     
     return res.redirect('/');
})

app.listen(7000,()=>{
    console.log('port is up and running')
})