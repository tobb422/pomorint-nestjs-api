import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1553335555910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379" UNIQUE ("image")`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_479f4d9be96da3b90c54f85a379"`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`)
  }
}
