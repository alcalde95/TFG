import { DefaultRedButton, DefaultWhiteButton } from "./CustomTailwindElements"

export const DeleteModal = ({ verModal, setVerModal, handleDelete, textoEntrada,message }) => {
    //este verModal se sacará

    const handleDeleteClick = () => {
        handleDelete()
        setVerModal(!verModal)
    }

    return (
        <>


            {
                verModal
                    ? <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 bg-blend-hard-light backdrop-blur-sm z-50 ">
                        <div className="bg-[#1C1917] border border-gray-500 rounded-lg  p-4 w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-wrap gap-1 ">
                            <h1 className="text-2xl text-white text-left">Borrado de {textoEntrada}</h1>
                            <p className="bg-gray-700 w-full h-px rounded-full mb-2 mt-2" />
                            <p className="text-white max-w-fit text-left">{message}</p>
                            <p className="bg-gray-700 w-full h-px rounded-full mb-2 mt-2" />
                            <div className="flex flex-row flex-wrap w-full justify-center md:justify-end gap-2">
                                <DefaultRedButton handleClick={handleDeleteClick} text="Eliminar" />
                                <DefaultWhiteButton handleClick={() => setVerModal(!verModal)} text="Cancelar" />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}