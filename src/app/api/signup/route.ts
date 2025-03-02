
import bcrypt from 'bcryptjs'
import { connectToDB } from '@/utils/database'
import User from '@/models/user'
import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '@/utils/jwt'
import { NextResponse } from 'next/server'

interface UserData {
  email: string
  password: string
  name: string
 
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export async function POST(req: Request) {
  try {
    await connectToDB()

    const body: UserData = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    const newUser = new User({
      userID: uuidv4(),
    
      email,
      name,
      password: hashedPassword,
      isVerified: true,
    })

    await newUser.save()

    const token = generateToken(newUser)

    const response = NextResponse.json(
      {
        message: 'Signup successful',
        user: { 
          email: newUser.email, 
          userID: newUser.userID,
          name: newUser.name 
        },
      },
      { status: 201 }
    )

    response.cookies.set('authToken', token, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    return response

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Registration failed',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}


