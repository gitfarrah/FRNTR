import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index',{ userr: req.session.userr });
  res.render('index',{user:req.session.user===undefined?"":req.session.user});
});

export default router;