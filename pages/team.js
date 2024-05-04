import Image from 'next/image';
import React from 'react';

export default function Team() {
    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    Nasz Zespół
                </h1>
                <p className="text-xl text-center text-gray-600 mt-4">
                    Poznaj fantastycznych ludzi, którzy tworzą naszą restaurację.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32">
                                    <Image
                                        src={member.photo}
                                        alt={member.name}
                                        fill
                                        sizes="32vw"
                                        style={{ objectFit: 'cover' }}
                                        priority={index < 3}
                                    />
                                </div>
                                <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{member.role}</p>
                                <p className="mt-2 text-gray-600 text-center">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const teamMembers = [
    {
        name: "John Doe",
        role: "Szef Kuchni",
        bio: "John jest pasjonatem kulinarnym z 20 lat doświadczenia w najlepszych kuchniach świata.",
        photo: "/images/john_doe.jpg",
    },
    {
        name: "Anna Smith",
        role: "Manager",
        bio: "Anna zarządza naszym zespołem z niezwykłą starannością i zaangażowaniem.",
        photo: "/images/anna_smith.jpg",
    },
    {
        name: "Tom Brown",
        role: "Barman",
        bio: "Tom tworzy innowacyjne koktajle, które zachwycają naszych gości.",
        photo: "/images/tom_brown.jpg",
    }
];
