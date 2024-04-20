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
import { DefaultButton, DefaultWhiteButton, InputMovinTitle } from "../CustomTailwindElements"

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

  const filteredMondaySessions = filterSessions({ sessions: mondaySessions })
  const filteredTuesdaySessions = filterSessions({ sessions: tuesdaySessions })
  const filteredWednesdaySessions = filterSessions({ sessions: wednesdaySessions })
  const filteredThursdaySessions = filterSessions({ sessions: thursdaySessions })
  const filteredFridaySessions = filterSessions({ sessions: fridaySessions })
  const filteredSaturdaySessions = filterSessions({ sessions: saturdaySessions })
  const filteredSundaySessions = filterSessions({ sessions: sundaySessions })

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
    <div className="w-full min-w-80 min-h-screen flex flex-col items-center gap-2">
      <Header />
      {
        classes && <ClassHeaderInfo headerClass={classes} />

      }
      <section className="h-full flex flex-col items-center border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">

        <h1 className="text-4xl m-2">Sesiones</h1>
        {
          email === classes.instructorEmail &&
          <DefaultButton handleClick={() => setShow(!show)} text="Añadir sesión" />
        }
        {
          show
            ? <form className="w-11/12 md:w-4/6 max-w-2xl gap-2 flex flex-col items-center bg-[#1C1917]   p-2 rounded-lg border-gray-500 border mt-2"
              onSubmit={handleSubmit}>
              <InputMovinTitle name="Date" type="datetime-local" />
              {
                dateError ? <p className="text-red-500">{dateError}</p> : null
              }
              <select name="Instructor"
                className="border border-green-500 w-full h-10 p-1 rounded-md m-0 text-center bg-transparent"
              >
                {
                  instructors.map((instructor, index) => {
                    return <option key={index} value={instructor.email} className="text-center rounded-lg border border-green-500 bg-[#09090B]">{instructor.email}</option>
                  })
                }
              </select>
              {
                instructorEmailError ? <p className="text-red-500">{instructorEmailError}</p> : null
              }
              <DefaultWhiteButton text={"Añadir"} />
            </form>
            : null
        }
        <br />
        <DefaultButton handleClick={() => setFiltered(!filtered)} text={filtered ? "Sin impartir" : "Todas"} />

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

