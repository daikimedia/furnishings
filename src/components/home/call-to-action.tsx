'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function ConsultationBanner() {
    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Connect to your API or email service
        if (name && contact) {
            setSubmitted(true)
        }
    }

    return (
        <section className="bg-gradient-to-r from-white to-green-50 py-16 px-6 text-center">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 leading-tight">
                    Transform Your Space with <span className="text-green-600">Experts Who Deliver</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 font-medium">
                    30+ Years. Hundreds of Masterpieces. <br className="hidden md:block" />Your Turn Now.
                </p>
                <p className="mt-2 text-gray-500">
                    Book your personalized consultation today and discover what true craftsmanship feels like.
                </p>

                <form
                    className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-5 py-3 rounded-xl border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        type="text"
                        placeholder="Your Contact No"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="px-5 py-3 rounded-xl border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
                    >
                        GET MY CONSULTATION
                    </button>
                </form>

                {submitted && (
                    <p className="mt-4 text-green-600 font-medium flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                        Your submission was successful.
                    </p>
                )}
            </div>
        </section>
    )
}
