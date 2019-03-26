import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553638235846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" ALTER COLUMN "result_point" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" ALTER COLUMN "result_point" DROP DEFAULT`);
    }

}
