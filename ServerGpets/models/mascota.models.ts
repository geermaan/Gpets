import { Schema, Document, model } from 'mongoose';

const mascotaSchema = new Schema({
    
    created: {
        type: Date
    },
    numero:{
        type:String
    },
    nombre:{
        type:String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        requered: [true, 'debe de existir una referencia a un usuario']
    }

});

mascotaSchema.pre<IMascota>('save', function( next ) {
    this.created = new Date();
    next();
});

interface IMascota extends Document{
    created: Date;
    numero: string;
    nombre: string;
    usuario:string;
}

export const Mascota = model<IMascota>('Mascota', mascotaSchema);