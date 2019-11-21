"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mascotaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    numero: {
        type: String
    },
    nombre: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        requered: [true, 'debe de existir una referencia a un usuario']
    }
});
mascotaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Mascota = mongoose_1.model('Mascota', mascotaSchema);
