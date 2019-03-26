import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553630752876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3"`);
        await queryRunner.query(`ALTER TABLE "labels" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_f31f88025417e09223ea9a66b0b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_f31f88025417e09223ea9a66b0b"`);
        await queryRunner.query(`ALTER TABLE "labels" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
