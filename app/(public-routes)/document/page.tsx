'use client';

import { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/constants/api';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');
    const [uploadedUrl, setUploadedUrl] = useState('');

    const uploadFile = async () => {
        if (!file) return alert('Please choose a file first');

        try {
            // Step 1: Get presigned URL
            const response = await axios.get(
                `${
                    API_ROUTES.DOCUMENTS
                }/generate-upload-url?fileName=${encodeURIComponent(file.name)}`
            );
            console.log('DATA: ', response.data);

            // Step 2: Upload file directly to S3
            const uploadResponse = await axios.put(
                response.data.presigned_url,
                {
                    method: 'PUT',
                    body: file,
                }
            );
            console.log('UPLOAD RESPONSE', uploadResponse);
            setStatus('File uploaded successfully!');
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

            {uploadedUrl && (
                <p className="mt-4">
                    <strong>Uploaded File URL:</strong>{' '}
                    <a
                        className="text-blue-600 underline"
                        href={uploadedUrl}
                        target="_blank"
                    >
                        {uploadedUrl}
                    </a>
                </p>
            )}
        </div>
    );
}
