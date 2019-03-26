import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553637315718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" DROP COLUMN "pomo"`);
        await queryRunner.query(`ALTER TABLE "issues" ADD "estimate_point" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "issues" ADD "result_point" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" DROP COLUMN "result_point"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP COLUMN "estimate_point"`);
        await queryRunner.query(`ALTER TABLE "issues" ADD "pomo" integer NOT NULL`);
    }

}
