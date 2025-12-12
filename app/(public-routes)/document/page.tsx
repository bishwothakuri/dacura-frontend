'use client';

import { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/constants/api';

interface IParsePayload {
    file_name: string;
    mime_type: string;
    file_size: number;
    file_url: string;
}

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');

    const parseUploadedFile = (filePayload: IParsePayload) => {
        return axios.post(`${API_ROUTES.DOCUMENTS}/parse`, filePayload);
    };

    const uploadFile = async () => {
        if (!file) return alert('Please choose a file first');

        try {
            // Step 1: Get presigned URL
            const payload = {
                file_name: file.name,
                mime_type: file.type,
                file_size: file.size,
            };
            const response = await axios.post(
                `${API_ROUTES.DOCUMENTS}/generate-signed-url`,
                payload
            );
            // Step 2: Upload file directly to S3
            const uploadResponse = await axios.put(
                response.data.presigned_url,
                {
                    method: 'PUT',
                    body: file,
                }
            );
            console.log('Upload response:', uploadResponse);
            setStatus('File uploaded successfully!');
            return parseUploadedFile({
                ...payload,
                file_url: response.data.file_url,
            });
        } catch (error) {
            console.error('Error:', error);
            setStatus('Upload failed!');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 my-40">
            <h1 className="text-2xl font-semibold mb-4">Upload File to S3</h1>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            <button
                onClick={uploadFile}
                className="mx-2 px-4 py-2 bg-green-400 text-white rounded"
            >
                Upload
            </button>

            {status && <p className="mt-4 text-gray-700">{status}</p>}
        </div>
    );
}
