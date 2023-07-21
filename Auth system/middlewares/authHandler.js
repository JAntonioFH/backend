const boom = require('@hapi/boom');

function checkAdminrole(req, res, next){
  // console.log(req.user)
  const user = req.user;
  if (user.role === 'admin') {
    next();
  }else{
    next(boom.forbidden());
  }
}



function checkRoles(...roles){
  return (req, res, next)=>{
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    }else{
      next(boom.forbidden());
    }
  }
}

module.exports = {checkAdminrole,checkRoles}
