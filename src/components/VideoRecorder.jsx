import { useVideoRecorder } from '../hooks/useVideoRecorder'
import { formatTime } from '../utils/formatTime'
import quizzes from './../assets/quizzes.jpg'

// eslint-disable-next-line react/prop-types
export const VideoRecorder = ({ update, index, quiz }) => {
    const WIDTH = 300
    const HEIGHT = 500

    const {
        videoRef,
        isRecording,
        recordingTime,
        videoDuration,
        startRecording,
        stopRecording,
        recordedChunks,
        videoCover
    } = useVideoRecorder({ width: WIDTH, height: HEIGHT })

    const stop = () => {
        stopRecording()

        const quizFinal = {
            ...quiz,
            video: recordedChunks,
            videoCover: videoCover
        }
        console.log(quizFinal)
        update(index, quizFinal)
    }

    return (
        <div className="m-auto text-center">
            {isRecording ? (
                <>
                    <p>{formatTime(recordingTime)}</p>
                    <video className="m-auto" ref={videoRef} autoPlay muted />
                </>
            ) : recordedChunks.length > 0 ? (
                <div>
                    <p>{formatTime(videoDuration)} </p>
                    <video
                        className="m-auto"
                        src={URL.createObjectURL(
                            new Blob(recordedChunks, { type: 'video/webm' })
                        )}
                        width={WIDTH}
                        height={HEIGHT}
                        controls
                    />
                </div>
            ) : (
                <img
                    src={videoCover || quizzes}
                    className="m-auto"
                    alt="portada"
                    width={300}
                    height={500}
                />
            )}

            <button disabled={isRecording} onClick={startRecording}>
                Start
            </button>
            <button disabled={!isRecording} onClick={stop}>
                Stop
            </button>
        </div>
    )
}
