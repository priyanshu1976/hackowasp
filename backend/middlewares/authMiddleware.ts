import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// You should use env variables in real apps
const JWT_SECRET = 'hackowasp';
const JWT_EXPIRES_IN = '7d';

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  activity_level: string;
  goal?: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// ------------------- Signup -------------------
export const signup = async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const {
    username,
    email,
    password,
    age,
    weight,
    height,
    gender,
    activity_level,
    goal
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        age,
        weight,
        height,
        gender,
        activity_level,
        goal,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ------------------- Login -------------------
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: 'Login successful', token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
