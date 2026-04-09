import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/sql/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

export const AuthService = {
  async register(email: string, password: string) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('USER_EXISTS');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create(email, passwordHash);

    return { id: user.id, email: user.email };
  },

  async login(email: string, password: string) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: { id: user.id, email: user.email }
    };
  }
};
