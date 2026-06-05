import Image from 'next/image';

export default function PartImage({ part }) {
    return (
        <div className={`aspect-square rounded-lg mb-4 flex items-center justify-center overflow-hidden transition-colors ${
            part.image
                ? 'bg-white'
                : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'
        }`}>
            {part.image ? (
                <Image
                    src={part.image}
                    alt={part.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                />
            ) : (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
            )}
        </div>
    )
}