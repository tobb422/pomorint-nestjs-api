import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1553645241283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_68c7892926826f61d6a4a6f564d"`);
        await queryRunner.query(`DROP INDEX "IDX_68c7892926826f61d6a4a6f564"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" RENAME COLUMN "issue_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" RENAME CONSTRAINT "PK_1ac0a33ade1abb32c03516fa496" TO "PK_3d1b3f720e91ef08400d3b1d078"`);
        await queryRunner.query(`CREATE INDEX "IDX_1f49c5ca64fbef160746aba539" ON "issue_labels" ("id") `);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_1f49c5ca64fbef160746aba539a" FOREIGN KEY ("id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_1f49c5ca64fbef160746aba539a"`);
        await queryRunner.query(`DROP INDEX "IDX_1f49c5ca64fbef160746aba539"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" RENAME CONSTRAINT "PK_3d1b3f720e91ef08400d3b1d078" TO "PK_1ac0a33ade1abb32c03516fa496"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" RENAME COLUMN "id" TO "issue_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_68c7892926826f61d6a4a6f564" ON "issue_labels" ("issue_id") `);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_68c7892926826f61d6a4a6f564d" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
