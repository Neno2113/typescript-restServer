import { Router } from 'express'
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario';



const router = Router();




router.get('/', getUsuarios );
router.get('/:id', getUsuario );
router.put('/:id', putUsuario );
router.post('/', postUsuario );
router.delete('/:id', deleteUsuario );










export default router;