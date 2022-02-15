import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Status } from './Status';
import Round from './Round';
//import { ResultadoID } from "./ResultadoID";
import Objetivo from './Objetivo';
@Entity('tb_resultado')
export default class Resultado {
    /*@PrimaryColumn('int')
    id: number;

    @ManyToOne(type => Round)//, { primary: true })
    @JoinColumn({ name: "round_id", referencedColumnName: "id" })
    round_id: Round;

    @ManyToOne(type => Objetivo)//, { primary: true })
    @JoinColumn({ name: "objetivo_id", referencedColumnName: "id" })
    objetivo_id: Objetivo;*/
    
    @PrimaryColumn('int')
    round_id: number;

    @PrimaryColumn('int')
    objetivo_id: number;
    
    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;
}