import { VideoRecorder } from './VideoRecorder'

// eslint-disable-next-line react/prop-types
export const Quizzes = ({ quiz }) => {
    return (
        <div style={{ margin: 'auto' }}>
            <VideoRecorder />
            <p>{quiz}</p>
        </div>
    )
}
