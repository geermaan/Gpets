import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Mascota } from '../models/mascota.models';





const mascotaRoutes = Router();



//obtener post 
mascotaRoutes.get('/',async(req: any, res: Response) => {
  
 

   const mascotas =await Mascota.find().
                                 populate('usuario','-password').
                                 exec();

   res.json({
      ok:true,
      mascotas
   })

});




// crear post POST paginados
mascotaRoutes.post('/', [verificaToken],(req: any, res: Response) => {

   
   const body = req.body;
   body.usuario = req.usuario._id;


   Mascota.create(body) .then ( async postDB =>{

      await postDB.populate('usuario','-password').execPopulate();
    
    res.json({
        ok: true,
       post: postDB
    });

   }).catch(err =>{

    res.json(err)
   })

   

});





export default mascotaRoutes;