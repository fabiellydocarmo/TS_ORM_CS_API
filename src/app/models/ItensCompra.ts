import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Jogador from './Jogador';
@Entity('tb_compra_itens')
class ItensCompra {

    @PrimaryColumn('int')
    id: number;

    @Column()
    quantidade: number;

    @Column()
    valor: number
}
export default ItensCompra;