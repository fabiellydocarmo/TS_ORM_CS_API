import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Resultado from '../models/Resultado';
class ResultadoController {
    async list(req: Request, res: Response) {
        const repository = getRepository(Resultado);
        const lista = await repository.find();
        //console.log(lista);
        return res.json(lista);
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Resultado);
        const j = repository.create(req.body);
        console.log("Resultado adicionado com sucesso! ", j);
        await repository.save(j);
        return res.json(j);
        //console.log(req.body)
        //return res.send(200)
    }
    async delete(req: Request, res: Response) {
        const repository = getRepository(Resultado);
        const ID = req.body.round_id
        const ID2 = req.body.objetivo_id
        const idsExists = await repository.findOne({ "round_id": ID, "objetivo_id": ID2 })
        if (idsExists) {
            await repository.remove(idsExists);
            console.log("Resultado deletado com sucesso! Id do round: " + ID + "; Objetivo do round: " + ID2)// Id do objetivo: " + Res.objetivo_id + " Id do round: " + Res.round_id)
            return res.sendStatus(204); //---> No content
        } else {
            console.log("Resultado não encontrado na tabela!")
            return res.sendStatus(404); //---> Not found
        }
    }
} export default new ResultadoController();