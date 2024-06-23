import Express from 'express' 
import Path from 'path' //Gets the pasth of current project folder. Better to use this one in case fodler is saved on another device path.
//Starting server with node.js backend. Insted of using npm start for react(frontend) server. FrontEnd running with the backend.
//npm install -g nodemon powershell Set-ExecutionPolicy Unrestricted
//npm run build to run the build of the front end, optimized for deployment.
import {connect_SQL, log_user, insert_data, search_data} from './db.js'
//added
import session from 'express-session';
import memorystore from 'memorystore';

// Create the memory store with session as the argument
const MemoryStore = memorystore(session); //set up Redis Mongo or SQL for development
//addend

const app = Express()
const dir = Path.resolve()
const dir_front = "frontend/build"
app.use(Express.static(dir_front))
app.use(Express.json())
app.use(Express.urlencoded({ extended:false})) //middleware set up. Used to parse(convert from http requests to JS objets ). true for complex structures beyond single key-value pairs.


app.use(session({
    secret: 'your_secret_key_here', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Ensures the cookie is only sent over HTTPS
        httpOnly: true, // Prevents client-side access to the cookie
        maxAge: 24 * 60 * 60 * 1000, // Session expires in 24 hours (in ms)
    },
    store: new MemoryStore({
        checkPeriod: 86400000 // Delete expired entries every 24h (in ms)
    })
}));

app.listen ('80', function(){
    console.log("Server has started.")
    
})



//Used with /register and /search
function checkLoggedIn(req, res, next) {
    console.log(req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
        next(); // User is authenticated, continue to the next middleware or route handler
    } else {
        let loginSuccess = false;
        res.redirect(`/login?loginSuccess=${loginSuccess}`); // Not authenticated, redirect to login page
    }
}

function alreadyLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
        res.redirect('/home')
    } else {
        next()
    }
}

app.get('/', function(req, res){
    console.log(dir)
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/home", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/login", alreadyLoggedIn, (req, res)=>{
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/register", checkLoggedIn, (req, res)=>{
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/search", checkLoggedIn, (req, res)=>{
    res.sendFile(dir + "/" + dir_front + "/index.html")
})
//React(frontend) is making the pipeline.

app.post("/login_user", async (req, res)=>{
    let {user, password} = req.body
    console.log(user+" "+password)
    connect_SQL()
    const {success, id} = await log_user(user, password);
    console.log(success)
    console.log(id)
    req.session.isLoggedIn = success;
    req.session.idData = id;
    console.log(req.session.idData)
    let loginSuccess =  req.session.isLoggedIn;
    console.log(req.session.isLoggedIn)
    res.redirect(`/home?loginSuccess=${loginSuccess}`)
})

app.post("/logout_user", (req, res)=>{
    console.log("log out")
    let loginSuccess = 1;
    req.session.isLoggedIn = false;
    res.redirect(`/login?loginSuccess=${loginSuccess}`)
})

app.post("/data_insersion", async (req, res)=>{
    let {hora_inicial, hora_final, actividad, descripcion} = req.body
    connect_SQL()
    let id = req.session.idData;
    const {successInsert} = await insert_data(id, hora_inicial, hora_final, actividad, descripcion);
    console.log(successInsert)
    res.redirect(`/register?loginSuccess=${successInsert}`)
})

app.post("/data_search", async (req, res)=>{
    let {user} = req.body
    connect_SQL()
    const array = await search_data(user)
    console.log("This is app.post array:", array)
    res.json(array) //form is not re-rendered here. Only data is sent.
})