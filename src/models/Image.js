import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class Image extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode estar vazio',
                    },
                },
            },
            filename: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode estar vazio',
                    },
                },
            },
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${appConfig.url}/image/${this.getDataValue('filename')}`;
                },
            },
        }, {
            sequelize,
            tableName: 'fotos',
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
    }
}
