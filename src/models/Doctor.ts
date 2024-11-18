import { Model, DataTypes } from "sequelize";
import db from "../config/dbConfig";

class Doctor extends Model {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public crm!: string;
  public hospitalVinculado!: string;
  public email!: string;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    crm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hospitalVinculado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "Doctor",
  }
);

export default Doctor;
