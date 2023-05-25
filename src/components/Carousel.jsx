/* eslint-disable react/prop-types */
import { useState } from 'react'

import { VideoRecorder } from './VideoRecorder'

export const Carousel = ({ quizzes, index, update }) => {
    const [currentSlide, setCurrentSlide] = useState(index)

    const goToNextSlide = () => {
        const nextSlideIndex = (currentSlide + 1) % quizzes.length
        setCurrentSlide(nextSlideIndex)
    }

    const goToPrevSlide = () => {
        const prevSlideIndex =
            (currentSlide - 1 + quizzes.length) % quizzes.length
        setCurrentSlide(prevSlideIndex)
    }

    return (
        <div className="max-w-800px mx-auto p-4">
            <div className="relative overflow-hidden">
                {quizzes.map((quiz, indexRecord) => (
                    <div
                        key={indexRecord}
                        className={`carousel-item ${
                            indexRecord === currentSlide ? 'block' : 'hidden'
                        }`}
                    >
                        <h3 className="text-2xl font-bold mb-4">{quiz.quiz}</h3>
                        <VideoRecorder
                            update={update}
                            index={indexRecord}
                            quiz={quiz}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={goToPrevSlide}
                    className="rounded-md border border-transparent py-2 px-4 text-base font-medium bg-[#ffa600] text-white hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus-visible:ring-4 mr-5"
                >
                    Anterior
                </button>
                <button
                    onClick={goToNextSlide}
                    className="rounded-md border border-transparent py-2 px-4 text-base font-medium bg-[#ffa600] text-white hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus-visible:ring-4 ml-5"
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}
