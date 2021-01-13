function authadm(req,res,next){
    console.log(req.session.admuser)
    if( req.session.admuser!= undefined){
        return next()
    }else{
        res.render('login_adm',{title: 'login'})
    }
}

module.exports = authadm