import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableTransactions1678052684139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "transactions" ADD COLUMN "reversed" boolean`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
