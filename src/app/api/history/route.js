// src/app/api/history/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const historyFilePath = path.join(process.cwd(), 'data', 'history.json');

if (!fs.existsSync(path.dirname(historyFilePath))) {
  fs.mkdirSync(path.dirname(historyFilePath), { recursive: true });
}

export async function POST(request) {
  try {
    const { 
      timestamp, 
      status, 
      ethAddress,
      walletProvider,
      network,
      ip,
      location,
      browser,
      purpose,
      balance
    } = await request.json();

    let history = [];
    if (fs.existsSync(historyFilePath)) {
      const fileData = fs.readFileSync(historyFilePath, 'utf8');
      history = JSON.parse(fileData);
    }

    history.push({ 
      timestamp, 
      status, 
      ethAddress,
      walletProvider,
      network,
      ip,
      location,
      browser,
      purpose,
      balance
    });

    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));

    return NextResponse.json({ message: 'History updated', history });
  } catch (error) {
    console.error('Error in POST /api/history:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    let history = [];
    if (fs.existsSync(historyFilePath)) {
      const fileData = fs.readFileSync(historyFilePath, 'utf8');
      history = JSON.parse(fileData);
    }

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error in GET /api/history:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}