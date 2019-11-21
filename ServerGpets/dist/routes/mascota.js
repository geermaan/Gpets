"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const mascota_models_1 = require("../models/mascota.models");
const mascotaRoutes = express_1.Router();
//obtener post 
mascotaRoutes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const mascotas = yield mascota_models_1.Mascota.find().
        populate('usuario', '-password').
        exec();
    res.json({
        ok: true,
        mascotas
    });
}));
// crear post POST paginados
mascotaRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    mascota_models_1.Mascota.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = mascotaRoutes;
