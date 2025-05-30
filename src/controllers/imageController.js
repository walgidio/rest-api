import multerConfig from "../config/multer";
import multer from "multer";

import Image from "../models/Image";

const upload = multer(multerConfig).single('arquivo');


class imageController {
    store(req, res) {
        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    errors: [err.code],
                });
            }

            try {
                const { originalname, filename } = req.file;
                const { aluno_id } = req.body;
                const foto = await Image.create({originalname, filename});

                return res.json(foto);
            } catch (error) {
                return res.status(400).json({
                    errors: ['O aluno não existe'],
                });
            }
        });
    }
}

export default new imageController();
