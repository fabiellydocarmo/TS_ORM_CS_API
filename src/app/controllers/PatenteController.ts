import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Patente from '../models/Patente';
class PatenteController {

    async list(req: Request, res: Response) {
        const repository = getRepository(Patente);
        const lista = await repository.find();
        return res.json(lista);
    }

    async store(req: Request, res: Response) {

        const repository = getRepository(Patente);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
} export default new PatenteController();