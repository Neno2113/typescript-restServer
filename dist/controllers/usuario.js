"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({
            usuario
        });
    }
    else {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con ese id'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailValidation = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailValidation) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = yield usuario_1.default.build(body);
        yield usuario.save();
        res.status(201).json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield usuario_1.default.update(body, {
            where: {
                id
            }
        });
        console.log(usuario);
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    //Eliminacion logica
    yield usuario.update({ estado: false });
    //Eliminacion fisica
    // await usuario.destroy();
    return res.json({
        usuario
    });
    res.json({
        id,
        msg: 'deleteUsuarios'
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map