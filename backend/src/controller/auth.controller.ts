import prisma from '../lib/pg.dbl'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { generateToken } from '../lib/utils' // make sure you have a JWT util

export const signup = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    age,
    weight,
    height,
    gender,
    activity_level,
    goal,
    duration_weeks,
    profilepicUrl
  } = req.body

  try {
    // Validate required fields
    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !weight ||
      !height ||
      !gender ||
      !activity_level ||
      !goal ||
      !duration_weeks ||
      !profilepicUrl
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        gender,
        activity_level,
        goal,
        profilepicUrl
      },
    })

    console.log(newUser)

    // Generate JWT token
    generateToken(newUser.email, res)

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // 3. Generate JWT token
    generateToken(user.email, res)

    // 4. Respond with user data
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        activity_level: user.activity_level,
        goal: user.goal,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
