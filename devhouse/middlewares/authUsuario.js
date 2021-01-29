function authUsuario(req,res,next){
    console.log(req.session.loginUser)
    if( req.session.loginUser!= undefined){
        return next()
    }else{
        res.render('login',{title: 'login'})
    }
}

module.exports = authUsuario