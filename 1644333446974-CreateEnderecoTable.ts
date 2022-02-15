import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnderecoTable1644333446974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_endereco',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'cep',
                    type: 'varchar(8)',
                    isNullable: false
                },
                {
                    name: 'complemento',
                    type: 'varchar(100)',
                    isNullable: true
                }
            ]
        }))
}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_endereco')}

}
