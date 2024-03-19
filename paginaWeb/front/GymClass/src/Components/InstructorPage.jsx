import { useContext, useEffect, useState } from "react"
import { Header } from "./Header"
import { UserContext } from "../Contexts/UserContext"
import { Classes } from "./Classes/Classes"
import { InputMovinTitle } from "./CustomTailwindElements"
import { ClassesContext } from "../Contexts/ClassesContext"
import { useClasses } from "../hooks/useClasses"

export const InstructorPage = () => {

  const [ver, setVer] = useState(false)
  const { jwt, email } = useContext(UserContext)
  const { classes } = useContext(ClassesContext)

  const { getInstructorClasses, createClass, nameError, descriptionError, maxCapacityError, durationError, photoError } = useClasses()

  useEffect(() => {
    getInstructorClasses({ jwt })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const convertFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };


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
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl m-2 underline cursor-default">Mis Clases</h1>
        <button onClick={() => setVer(!ver)} className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Add</button>
        {
          ver
            ? <form className="w-full gap-2 flex flex-col" onSubmit={handleSubmit}>
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
              <input type="file" name="photo" accept="image/*" onChange={null} />
              {
                photoError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{photoError}</div>
                  : null
              }
              <InputMovinTitle name="Duración" type="number" />
              {
                durationError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{durationError}</div>
                  : null
              }
              <InputMovinTitle name="Capacidad" type="text" />
              {
                maxCapacityError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{maxCapacityError}</div>
                  : null
              }
              <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Crear</button>
            </form>

            : null
        }


        <div className="flex flex-col items-center text-center w-full">
          {
            classes && <Classes classes={classes} editable={true} />
          }
        </div>
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