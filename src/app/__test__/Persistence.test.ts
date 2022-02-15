import { app, setup } from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest, { agent } from "supertest";
import { getConnection } from "typeorm";
import { isJSDocDeprecatedTag } from "typescript";

/* Primeiras tabelas */
const enderecos = [
    { id:1 , cep:"11111111" , complemento:"Passo Fundo" },
    { id:2 , cep: "22222222", complemento:"Alegrete" },
    { id:3 , cep: "33333333", complemento:"Porto Alegre" }
]
const jogadores = [
    { nickname: "Fabi", senha: "123456", pontos: 358, endereco_id:1 },
    { nickname: "Jean", senha: "432156", pontos: 742, endereco_id:2 },
    { nickname: "Ani", senha: "ani123", pontos: 77 , endereco_id:3 }
]
const partidas = [
    { id:1 , inicio:"2022-01-02" , fim:"2022-01-31" , jogador_nickname: "Fabi" },
    { id:2, inicio:"2022-01-07" , fim:"2022-01-31" , jogador_nickname: "Jean" },
    { id:3 , inicio: "2022-01-04", fim:"2022-01-31" , jogador_nickname: "Ani" }
] /* TABELAS DO TRABALHO */
const objetivos = [
    { id: 1, descricao:"vencer" , pontos: 5 },
    { id: 2, descricao: "perder", pontos: 4},
    { id: 3, descricao: "empatar", pontos: 10}
]
const rounds = [
    { id: 4, numero: 8, inicio: "2022-01-05", fim: "2022-01-05" , modo:"CONTRATERRORISTA" , partida_id: 1},
    { id: 5, numero: 9, inicio: "2022-01-05", fim: "2022-01-05", modo: "TERRORISTA", partida_id: 2},
    { id: 6, numero: 10, inicio: "2022-01-05", fim: "2022-01-05", modo: "CONTRATERRORISTA", partida_id:3 }
]
const resultados = [
    { status: "SIM", objetivo_id: 3, round_id: 4 },//id: { objetivo: 1, round: 4 } },
    { status: "NAO", objetivo_id: 2, round_id: 5 },//id: { objetivo: 2, round: 5} },
    { status: "SIM", objetivo_id: 1, round_id: 6 }//id: { objetivo: 2, round: 6} }
]

describe("Testes de persistência", () => {
    beforeAll(async () => {
        await setup()
    });
    afterAll(async () => {
        await getConnection().close()
        console.log("Conexão finalizada!")
    });

    it('Mostrar todas as tabelas', async() => {
        var agent = supertest(app)
        const p = await agent.post('/partida/list')
        console.log("Partidas:\n", p.body)
        const j = await agent.post('/jogador/list')
        console.log("Jogadores:\n", j.body)
        const e = await agent.post('/endereco/list') 
        console.log("Endereços:\n", e.body)
        const o = await agent.post('/objetivo/list')
        console.log("Objetivos:\n", o.body)
        const r = await agent.post('/round/list')
        console.log("Rounds:\n", r.body)
        const R = await agent.post('/resultado/list')
        console.log("Resultados:\n", R.body)
     })

     it('Adicionar itens', async() => {
         var agent = supertest(app)
         for(let E of enderecos) {
             await agent.post('/endereco/store').send(E)
         } for(let J of jogadores) {
            await agent.post('/jogador/store').send(J)
        } for(let P of partidas) {
            await agent.post('/partida/store').send(P)
        }
     })

    it('Adicionar ou remover resultados, rounds e objetivos (mostrar se houver)', async() => {
        var agent = supertest(app)
        const allRo = await agent.post('/round/list')
        const allRe = await agent.post('/resultado/list')
        const allO = await agent.post('/objetivo/list')
        const listRo = allRo.body
        const listRe = allRe.body
        const listO = allO.body
        if(listRo.length == 0 && listRe.length == 0 && listO.length == 0) {
            console.log("Nenhum resultado, round e objetivo encontrados!!! Vão ser adicionados agora " + rounds.length + " rounds, " + resultados.length + " resultados e " + objetivos.length + " objetivos!")
            for(let O of objetivos) {
                await agent.post('/objetivo/store').send(O)
            } for(let Ro of rounds) {
                await agent.post('/round/store').send(Ro)
            } for(let Re of resultados) {
                await agent.post('/resultado/store').send(Re)
            }
        } else {
            console.log(" => Lista de rounds:\n", listRo, '\n\n => Lista de resultados:\n', listRe, '\n\n => Lista de objetivos:\n', listO)
            for(let Re of resultados) {
                await agent.post('/resultado/delete').send(Re)
            } for(let O of listO) {
                await agent.post('/objetivo/delete').send({ "id": O.id })
            } for(let Ro of listRo) {
                await agent.post('/round/delete').send({ "id": Ro.id })
            }
        }
     })
})