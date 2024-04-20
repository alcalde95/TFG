import { useContext, useEffect, useState } from "react"
import { Header } from "./Header"
import { UserContext } from "../Contexts/UserContext"
import { Classes } from "./Classes/Classes"
import { DefaultWhiteButton, InputMovinTitle } from "./CustomTailwindElements"
import { ClassesContext } from "../Contexts/ClassesContext"
import { useClasses } from "../hooks/useClasses"
import { convertFile } from "../utils"

export const InstructorPage = () => {

  const [ver, setVer] = useState(false)
  const [mode, setMode] = useState("mine")
  const { jwt, email } = useContext(UserContext)
  const { classes } = useContext(ClassesContext)

  const { getInstructorClasses, createClass, getManagedClasses, nameError, descriptionError, maxCapacityError, durationError, photoError, managedClasses } = useClasses()

  useEffect(() => {
    getInstructorClasses({ jwt })
    getManagedClasses({ jwt })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get("Nombre")
    const description = data.get("Descripcion")
    const inputPhoto = data.get("photo")
    const photo = (await convertFile(inputPhoto)).split(",")[1]
    const duration = isNaN(parseInt(data.get("Duración"))) ? 0 : parseInt(data.get("Duración"))
    const maxCapacity = isNaN(parseInt(data.get("Capacidad"))) ? 0 : parseInt(data.get("Capacidad"))
    const res = await createClass({ name, photo, description, maxCapacity, duration, instructorEmail: email })
    if (res) {
      getInstructorClasses({ jwt })
      setVer(false)
    }
  }
  
  return (
    <div className=" min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white">
      <Header />
      <div className="sticky top-1  left-10 z-50 flex flex-wrap gap-2 items-center justify-center w-auto" >
        <button onClick={() => setMode("mine")}
          className="backdrop-blur-lg w-auto min-w-52 h-10 text-white  p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500"
        >
          Mis Clases
        </button>
        <button onClick={() => setMode("managed")}
          className="backdrop-blur-lg w-auto min-w-52 h-10 text-white  p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500"
        >
          Clases gestionadas
        </button>
      </div>
      <main className="h-full flex flex-col place-content-start items-center m-2 p-2">


        {
          mode === "mine" ? <>
            <h1 className="text-4xl m-2 underline cursor-default">Mis Clases</h1>
            <button onClick={() => setVer(!ver)} className="bg-[#09090B] w-auto min-w-52 h-10 text-white  p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500">Add</button>
            {
              ver
                ? <form className="w-11/12 md:w-4/6 max-w-2xl gap-2 flex flex-col items-center bg-[#1C1917]   p-2 rounded-lg border-gray-500 border mt-2" onSubmit={handleSubmit}>
                  <InputMovinTitle name="Nombre" type="text" />
                  {
                    nameError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{nameError}</div>
                      : null
                  }
                  <InputMovinTitle name="Descripcion" type="textarea" />
                  {
                    descriptionError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{descriptionError}</div>
                      : null
                  }
                  <input type="file"
                    name="photo"
                    accept="image/*"
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-500 file:text-white
                    hover:file:bg-green-500 
                    hover:file:cursor-pointer"
                  />

                  {
                    photoError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{photoError}</div>
                      : null
                  }
                  <InputMovinTitle name="Duración" type="number" min={1}/>
                  {
                    durationError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{durationError}</div>
                      : null
                  }
                  <InputMovinTitle name="Capacidad" type="number" min={1} />
                  {
                    maxCapacityError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{maxCapacityError}</div>
                      : null
                  }
                  <DefaultWhiteButton text="Crear" />
                </form>

                : null
            }


            <div className="flex flex-col items-center text-center w-full">
              {
                classes && <Classes classes={classes} editable={true} />
              }
            </div>
          </>
            : <>
              <h1 className="text-4xl m-2 underline cursor-default">Clases que gestiono</h1>
              <div className="flex flex-col items-center text-center w-full">
                {
                  managedClasses && <Classes classes={managedClasses} editable={false} managed={true} />
                }
              </div>
            </>
        }
      </main>
    </div>
  )
}








// const convertFile = async ({photo}) => {
//   const preview = document.querySelector("img");
//   const file = document.querySelector("input[type=file]").files[0];
//   const reader = new FileReader();
//   console.log(file)
//   reader.addEventListener(
//     "load",
//     function () {
//       console.log(reader.result)
//       // convierte la imagen a una cadena en base64
//       preview.src = reader.result;
//     },
//     false,
//   );
//   //srcImage
//   if (file) {
//     await reader.readAsDataURL(file);
//     console.log(reader)
//   }
// }