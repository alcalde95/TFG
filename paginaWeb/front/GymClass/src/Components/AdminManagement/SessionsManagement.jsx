import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../Header"
import { Sessions } from "../Sessions"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"
import { UserContext } from "../../Contexts/UserContext"
import { useSessions } from "../../hooks/useSessions"
import { SessionsContext } from "../../Contexts/SessionsContext"
import { ClassesContext } from "../../Contexts/ClassesContext"
import { useClasses } from "../../hooks/useClasses"

export const SessionsManagement = () => {

  const [show, setShow] = useState(false)
  const { sessions } = useContext(SessionsContext)
  const { classes } = useContext(ClassesContext)
  const { jwt,email } = useContext(UserContext)

  const { createSession, getSessions, getInstructors, dateError, instructorEmailError, instructors } = useSessions()
  const { getClass } = useClasses()

  const params = useParams()


  useEffect(() => {
    const { uuidClass } = params
    getSessions({ uuidClass, jwt })
    getClass({ uuidClass, jwt })
    getInstructors({ jwt })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const date = data.get("Date")
    const instructor = data.get("Instructor")
    const res = await createSession({ uuidClass: params.uuidClass, dataTime: date, instructorEmail: instructor, jwt })
    if (res) {
      getSessions({ uuidClass: params.uuidClass, jwt })
      setShow(false)
    }
  }

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          classes && <ClassHeaderInfo headerClass={classes} />

        }
      </section>
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sesiones</h1>
        {
        email === classes.instructorEmail && <button className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
          onClick={() => setShow(!show)}>Añadir sesión</button>
        }
          {
          show
            ? <form className="flex flex-col items-center md:grid md:grid-cols-3 w-80 md:w-full border-2 border-teal-500 bg-gray-400 m-2 rounded-md gap-4 p-2 shadow-[2px_2px_5px_0px] shadow-gray-800"
              onSubmit={handleSubmit}>
              <p>Fecha clase:<input type="datetime-local" name="Date" /></p>
              {
                dateError ? <p className="text-red-500">{dateError}</p> : null
              }
               <select name="Instructor"
                  className="border-2 border-teal-500  md:w-full h-10 p-1 rounded-md m-0"
                >
                  {
                    instructors.map((instructor, index) => {
                      return <option key={index} value={instructor.email}>{instructor.email}</option>
                    })
                  }
                </select>
              {
                instructorEmailError ? <p className="text-red-500">{instructorEmailError}</p> : null
              }
              <button type="submit" className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Añadir</button>
            </form>
            : null
        }

        {
          sessions && <Sessions sessions={sessions} />
        }
      </section>

    </div>
  )
}

