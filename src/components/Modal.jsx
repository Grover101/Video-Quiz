/* eslint-disable react/prop-types */
export const Modal = props => {
    return (
        <div className="static">
            <div className="fixed h-screen w-screen bg-gray-800 z-10 top-0 opacity-75"></div>
            <div className="fixed top-32 right-0 left-0 z-20 flex justify-center">
                <div className="rounded-xl mx-4 my-4 bg-black/50">
                    <div className="flex justify-end">
                        <button
                            onClick={() => props.toggler()}
                            className="text-red-600 px-2 m-2"
                        >
                            x
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
