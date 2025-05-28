import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
    async store(req, res) {
        const { email = '', password = '' } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                errors: ['Email ou Password inválidos'],
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                errors: ['User não existe'],
            });
        }

        if (!(await user.isPasswordValid(password))) {
            return res.status(401).json({
                errors: ['Password inválida'],
            });
        }

        const { id } = user;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({ token });
    }
}

export default new TokenController();
