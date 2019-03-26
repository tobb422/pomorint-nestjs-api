import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553630293737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "labels" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_89817c6a4a2afead69d27ead0b3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
