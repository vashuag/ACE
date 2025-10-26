import { NextRequest, NextResponse } from 'next/server'
import { testConnection } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    const isConnected = await testConnection()
    
    if (isConnected) {
      return NextResponse.json({ 
        success: true, 
        message: 'Database connection successful',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
