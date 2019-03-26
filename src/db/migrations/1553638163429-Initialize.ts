import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553638163429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" ALTER COLUMN "archived" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issues" ALTER COLUMN "archived" DROP DEFAULT`);
    }

}
