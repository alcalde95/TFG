import { useContext, useEffect, useState } from "react"
import { SessionsContext } from "../../Contexts/SessionsContext"
import { ClassesContext } from "../../Contexts/ClassesContext"
import { UserContext } from "../../Contexts/UserContext"
import { useClasses } from "../../hooks/useClasses"
import { useParams } from "react-router-dom"
import { Header } from "../Header"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"
import { useSessions } from "../../hooks/useSessions"
import { WeekSessions } from "../WeekSessions"
import { useSessionsFilter } from "../../hooks/useSessionsFilter"

export const SessionsManagement = () => {

  const [show, setShow] = useState(false)
  const { sessions,
    mondaySessions,
    tuesdaySessions,
    wednesdaySessions,
    thursdaySessions,
    fridaySessions,
    saturdaySessions,
    sundaySessions
  } = useContext(SessionsContext)

  const { classes } = useContext(ClassesContext)
  const { jwt, email } = useContext(UserContext)

  const { createSession, getSessions, getInstructors, dateError, instructorEmailError, instructors } = useSessions()
  const { getClass } = useClasses()

  const { filtered, setFiltered, filterSessions } = useSessionsFilter()

  const params = useParams()
  
  const filteredMondaySessions = filterSessions({sessions:mondaySessions})
  const filteredTuesdaySessions = filterSessions({sessions:tuesdaySessions})
  const filteredWednesdaySessions = filterSessions({sessions:wednesdaySessions})
  const filteredThursdaySessions = filterSessions({sessions:thursdaySessions})
  const filteredFridaySessions = filterSessions({sessions:fridaySessions})
  const filteredSaturdaySessions = filterSessions({sessions:saturdaySessions})
  const filteredSundaySessions = filterSessions({sessions:sundaySessions})

  useEffect(() => {
    const { uuidClass } = params
    getClass({ uuidClass, jwt })

    getSessions({ uuidClass, jwt })
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
            ? <form className="flex flex-row flex-wrap items-center justify-around gap-4 w-11/12 lg:w-96 h-auto border-2 border-teal-500 bg-gray-400 rounded-md  m-2 p-2 shadow-[2px_2px_5px_0px] shadow-gray-800"
              onSubmit={handleSubmit}>
              <input type="datetime-local"
                name="Date"
                className="border-2 border-teal-500 w-64  lg:w-full h-10 p-1 rounded-md m-0 text-center"
              />
              {
                dateError ? <p className="text-red-500">{dateError}</p> : null
              }
              <select name="Instructor"
                className="border-2 border-teal-500 w-52  lg:w-full h-10 p-1 rounded-md m-0  text-center"
              >
                {
                  instructors.map((instructor, index) => {
                    return <option key={index} value={instructor.email} className="text-center rounded-lg border-2 border-teal-500">{instructor.email}</option>
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
        <br/>
        <button type="submit"
          className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
          onClick={() => setFiltered(!filtered)}
        >
          {filtered ? "Sin impartir" : "Todas"}
        </button>

        {
          sessions && <WeekSessions mondaySessions={filteredMondaySessions}
            tuesdaySessions={filteredTuesdaySessions}
            wednesdaySessions={filteredWednesdaySessions}
            thursdaySessions={filteredThursdaySessions}
            fridaySessions={filteredFridaySessions}
            saturdaySessions={filteredSaturdaySessions}
            sundaySessions={filteredSundaySessions} />
        }
      </section>

    </div>
  )
}

