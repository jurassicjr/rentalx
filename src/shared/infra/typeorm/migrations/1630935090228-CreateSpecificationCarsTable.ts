import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateSpecificationCarsTable1630935090228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_specifications_cars_cars",
            columnNames: ["car_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cars",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_specifications_cars_specification",
            columnNames: ["specification_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "specifications",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("specifications_cars");
  }
}
