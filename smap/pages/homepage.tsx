import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-500 gap-4">
      <Image src="/smap.png" alt="smap" width={300} height={400} />
      <Link href="/map">
        <Button className="px-6 py-3 text-lg font-semibold text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-150 ease-in-out transform hover:scale-105">
          See the smap!
        </Button>
      </Link>
    </div>
  );
}
