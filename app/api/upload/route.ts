import { NextResponse } from 'next/server';
import FormData from 'form-data';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: '没有文件上传' }, { status: 400 });
        }

        // 创建新的 FormData 对象用于发送到 Pinata
        const pinataFormData = new FormData();
        const fileBuffer = await file.arrayBuffer();
        pinataFormData.append('file', Buffer.from(fileBuffer), {
            filename: file.name,
            contentType: file.type,
        });

        // 发送到 Pinata
        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            pinataFormData,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${pinataFormData.getBoundary()}`,
                    'pinata_api_key': process.env.PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('上传文件失败:', error);
        return NextResponse.json(
            { error: '上传文件失败' },
            { status: 500 }
        );
    }
}