import { useEffect, useState } from 'react'
import useToggle from './hooks/useToggle'

import { Modal } from './components/Modal'
import { Carousel } from './components/Carousel'

import quizImg from './assets/quizzes.jpg'

function App() {
    const [quizzes, setQuizzes] = useState(null)
    const [selectQuiz, setSelectQuiz] = useState(null)
    const { on, toggler } = useToggle()

    useEffect(() => {
        const fecthData = async () => {
            const res = await fetch('http://localhost:5173/db.json', {
                method: 'GET'
            })

            const data = await res.json()
            setQuizzes(data)
        }

        fecthData()
    }, [])

    const handleModal = index => {
        toggler()
        setSelectQuiz(index)
    }

    const updateQuizzes = (index, quiz) => {
        const quizAux = quizzes
        quizAux[index] = quiz
        setQuizzes(quizAux)
    }

    return (
        <>
            {on && (
                <Modal toggler={toggler}>
                    <Carousel
                        quizzes={quizzes}
                        index={selectQuiz}
                        update={updateQuizzes}
                    />
                </Modal>
            )}
            <div className="container mx-auto p-4">
                {!quizzes ? (
                    <div className="text-center mt-5">loading...</div>
                ) : !quizzes.length ? (
                    <div className="text-center mt-5">no hay cuestionario</div>
                ) : (
                    <div className="text-center mt-5">
                        <h1 className="text-6xl">Videos Quiz</h1>
                        <div className="grid grid-cols-4 gap-4 text-center mt-8">
                            {quizzes.map(({ quiz }, index) => (
                                <div key={index} className="mt-2">
                                    <img
                                        src={quiz.videoCover || quizImg}
                                        className="m-auto rounded-xl cursor-pointer"
                                        alt="portada"
                                        width={200}
                                        height={400}
                                        onClick={() => handleModal(index)}
                                    />
                                    <p>{quiz}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default App
