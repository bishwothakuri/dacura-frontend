'use client';

import { useState } from 'react';
import { Upload, Send, File, X, Loader } from 'lucide-react';
import axios from 'axios';
import { API_ROUTES } from '@/constants/api';

interface IParsePayload {
    file_name: string;
    mime_type: string;
    file_size: number;
    file_url: string;
}

export default function ChatPDFLayout() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<
        { text: string; sender: 'user' | 'bot' }[]
    >([]);

    const parseUploadedFile = (filePayload: IParsePayload) => {
        return axios.post(`${API_ROUTES.DOCUMENTS}/parse`, filePayload);
    };

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0] || null;
        if (!file) return alert('Please choose a file first');
        try {
            // Step 1: Get presigned URL
            const payload = {
                file_name: file.name,
                mime_type: file.type,
                file_size: file.size,
            };
            setUploading(true);
            const response = await axios.post(
                `${API_ROUTES.DOCUMENTS}/generate-signed-url`,
                payload
            );
            // Step 2: Upload file directly to S3
            await axios.put(response.data.presigned_url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
            console.log('Res data=>', response.data);
            const { file_key, file_url } = response.data;
            setUploadedFiles([...uploadedFiles, file_key]);
            setUploading(false);
            // Step 3: Parse uploaded file
            return parseUploadedFile({
                ...payload,
                file_url: file_url,
            });
        } catch (error) {
            console.error('Error:', error);
            setUploading(false);
        }
    };

    const removeFile = (fileKey: string) => {
        setUploadedFiles(uploadedFiles.filter((key) => key !== fileKey));
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage('');
        }
    };

    return (
        <div className="flex min-h-[80vh] bg-background">
            {/* Column 1: Uploaded Files */}
            <div className="w-72 border border-gray-200 border-border bg-card p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-foreground">
                    Documents
                </h2>

                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-muted-foreground transition-colors mb-4">
                    {uploading ? (
                        <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                    ) : (
                        <Upload className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                        {uploading ? 'Uploading...' : 'Upload PDF'}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => uploadFile(e)}
                    />
                </label>

                <div className="flex-1 overflow-y-auto space-y-2">
                    {uploadedFiles.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center mt-8">
                            No files uploaded yet
                        </p>
                    ) : (
                        uploadedFiles.map((file_key: string, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedFile(file_key)}
                                className={`cursor-pointer flex items-center gap-2 p-2 bg-muted rounded-lg group hover:bg-muted/80 transition-colors ${
                                    selectedFile === file_key && 'bg-gray-200'
                                }`}
                            >
                                <File className="w-4 h-4 text-muted-foreground shrink-0" />
                                <span className="text-sm text-foreground truncate flex-1">
                                    {file_key}
                                </span>
                                <button
                                    onClick={() => removeFile(file_key)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Column 2: PDF Viewer Placeholder */}
            <div className="flex-1 border  border-gray-200 bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <File className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                        {selectedFile ? (
                            <span className="font-bold">
                                Viewing: {selectedFile}
                            </span>
                        ) : (
                            'Select a document to view'
                        )}
                    </p>
                </div>
            </div>

            {/* Column 3: Chat Box */}
            <div className="w-1/3 border border-gray-200 border-border bg-card flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-foreground">
                        Chat
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center mt-8">
                            Start a conversation about your documents
                        </p>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-foreground'
                                    }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === 'Enter' && handleSendMessage()
                            }
                            placeholder="Ask about your documents..."
                            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
