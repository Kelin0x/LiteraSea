import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const metadata = await request.json();

        // 发送到 Pinata
        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            metadata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': process.env.PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('上传JSON失败:', error);
        return NextResponse.json(
            { error: '上传JSON失败' },
            { status: 500 }
        );
    }
}