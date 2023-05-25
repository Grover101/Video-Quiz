import { useEffect, useRef, useState } from 'react'

export const useVideoRecorder = ({
    limitTime = 120,
    width = 1280,
    height = 720
} = {}) => {
    const videoRef = useRef(null)
    const videoDuration = useRef(0)
    const mediaRecorderRef = useRef(null)
    const [recordedChunks, setRecordedChunks] = useState([])
    const [recordingTime, setRecordingTime] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [videoCover, setVideoCover] = useState(null)

    useEffect(() => {
        let timerId
        if (isRecording) {
            timerId = setInterval(() => {
                setRecordingTime(prevTime => {
                    const newTime = prevTime + 1
                    videoDuration.current = newTime
                    if (newTime >= limitTime) {
                        // Verificar si ha alcanzado los 2 minutos (120 segundos)
                        stopRecording()
                    }
                    return newTime
                })
            }, 1000)
        } else {
            setRecordingTime(0)
        }

        return () => {
            clearInterval(timerId)
        }
    }, [isRecording, limitTime])

    const startRecording = async () => {
        try {
            setIsRecording(true)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: width },
                    height: { ideal: height }
                },
                audio: true
            })
            videoRef.current.srcObject = stream
            videoRef.current.style.transform = 'scaleX(-1)'

            const options = { mimeType: 'video/webm;codecs=vp9' }
            mediaRecorderRef.current = new MediaRecorder(stream, options)

            mediaRecorderRef.current.addEventListener(
                'dataavailable',
                handleDataAvailable
            )
            mediaRecorderRef.current.addEventListener('stop', () => {
                setRecordingTime(0)
            })

            mediaRecorderRef.current.start()
        } catch (error) {
            console.error('Error accessing camera:', error)
        }
    }

    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== 'inactive'
        ) {
            mediaRecorderRef.current.stop()
            captureVideoCover()
        }
    }

    const handleDataAvailable = event => {
        if (event.data.size > 0) {
            setRecordedChunks(prev => prev.concat(event.data))
        }
    }

    const captureVideoCover = () => {
        const videoElement = videoRef.current
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = width
        canvas.height = height
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

        const dataUrl = canvas.toDataURL('image/png')
        setVideoCover(dataUrl)
        setIsRecording(false)
    }

    return {
        videoRef,
        isRecording,
        recordingTime,
        videoDuration: videoDuration.current,
        startRecording,
        stopRecording,
        recordedChunks,
        videoCover
    }
}
