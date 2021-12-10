import { Request, Response} from 'express'
import Usuario from '../models/usuario'


export const getUsuarios = async( req: Request, res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    });
    
}


export const getUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ){
        res.json({
            usuario
        })
    } else {
        return res.status(404).json({
            ok: false, 
            msg: 'No existe un usuario con ese id'
        })
    }

 
    
}


export const postUsuario = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const emailValidation = await Usuario.findOne( {
            where: {
                email: body.email
            }
        })

        if( emailValidation ){
            return res.status(400).json({
                ok: false, 
                msg: 'Ya existe un usuario con el email ' + body.email
            })
        }

        const usuario = await  Usuario.build( body );
        await usuario.save();

        res.status(201).json({
            usuario
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

  
    
}



export const putUsuario = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk( id );
        if( !usuario ){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        await Usuario.update( body, {
            where: {
                id
            }
        } );

        console.log(usuario);
        

        res.json({
            usuario
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
    
}



export const deleteUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if( !usuario ){
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        })
    }

    //Eliminacion logica
    await usuario.update({ estado: false})


    //Eliminacion fisica
    // await usuario.destroy();

    return res.json({
        usuario
    })


    res.json({
        id,
        msg: 'deleteUsuarios'
    })
    
}

