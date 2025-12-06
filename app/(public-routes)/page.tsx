import { APP_PATHS } from '@/constants/api';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="px-20 py-50 text-center">
            <h3>Hello World!</h3>
            <Link className="text-blue-400" href={APP_PATHS.USERS}>
                See app users
            </Link>
        </div>
    );
}
