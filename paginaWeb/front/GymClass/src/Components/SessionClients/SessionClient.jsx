import { useContext } from "react"
import { useSessionClients } from "../../hooks/useSessionClients"
import { UserContext } from "../../Contexts/UserContext"
import { toast } from "react-toastify"
import { ClassesContext } from "../../Contexts/ClassesContext"

export const SessionClient = ({ sessionClient }) => {
  const { jwt } = useContext(UserContext)
  const { getSessionClients, updateSessionClients } = useSessionClients()
  const { classes } = useContext(ClassesContext)


  const handleChangeAttend = async ({ sessionClient }) => {
    let date = new Date(sessionClient.data_time)
    date.setHours(date.getHours() + classes.duration*2/60)
    if (new Date() > date ) {
      toast.error('No puedes marcar la asistencia de un cliente tras finalizar la sesión', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }

    if (new Date() < new Date(sessionClient.data_time)) {
      toast.error('No puedes marcar la asistencia de un cliente antes de que se imparta la sesión', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }
    const attend = !sessionClient.attend
    const res = await updateSessionClients({ jwt, uuidClass: sessionClient.UUID_Class, dataTime: sessionClient.data_time, clientEmail: sessionClient.client_Email, attend, justified: sessionClient.justified })
    if (!res) {
      toast.error('No se ha podido actualizar el estado de la asistencia del cliente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }
    const msg = attend ? 'Marcada la asistencia del cliente con éxito' : 'Desmarcada la asistencia del cliente con éxito'

    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    getSessionClients({ jwt, UUIDClass: sessionClient.UUID_Class, date: sessionClient.data_time })
  }
  const handleChangeJustified = async ({ sessionClient }) => {
    let date = new Date(sessionClient.data_time)
    date.setHours(date.getHours() + classes.duration*2/60)
    if (new Date() < date ) {
      toast.error('No puedes marcar la justificación a la falta de asistencia de un cliente antes de que finalice la sesión', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }
    const justified = !sessionClient.justified
    const res = await updateSessionClients({ jwt, uuidClass: sessionClient.UUID_Class, dataTime: sessionClient.data_time, clientEmail: sessionClient.client_Email, attend: sessionClient.attend, justified: justified })
    if (!res) {
      toast.error('No se ha podido actualizar el estado de la justificación del cliente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }
    const msg = justified ? 'Marcada la asistencia del cliente con justificada' : 'Desmarcada la asistencia del cliente como no justificada' 

    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    getSessionClients({ jwt, UUIDClass: sessionClient.UUID_Class, date: sessionClient.data_time })
  }

  return (
    <tr key={sessionClient.client_Email} className="border-b border-gray-500 hover:bg-[#18181A] transition ease-in-out duration-200">
      <td >{sessionClient.client_Email}</td>
      <td className="text-center p-2">
        <input type="checkbox"
          checked={sessionClient.attend}
          onChange={() => handleChangeAttend({ sessionClient })}
          disabled={sessionClient.data_time > new Date()}
        />
      </td>
      <td className="text-center">

        <input type="checkbox"
          checked={sessionClient.justified}
          onChange={() => handleChangeJustified({ sessionClient })}
          disabled={sessionClient.data_time < new Date()}
        />
      </td>
    </tr>
  )
}
