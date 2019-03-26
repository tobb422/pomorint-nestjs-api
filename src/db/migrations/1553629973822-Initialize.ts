import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553629973822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "labels" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "created_at"`);
    }

}
