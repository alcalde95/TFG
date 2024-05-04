import { ClientSessions } from "./ClientSessions"

export const ClientWeekSessions = ({ mondaySessions, tuesdaySessions, wednesdaySessions, thursdaySessions, fridaySessions, saturdaySessions, sundaySessions,validated }) => {
    return (
        <div className="w-full flex flex-row flex-wrap">
            <p className="bg-gray-700 w-full h-px m-2 rounded-full" />
            {mondaySessions && <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Lunes({mondaySessions?.length})</summary>
                <ClientSessions sessions={mondaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>}
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Martes({tuesdaySessions?.length})</summary>
                <ClientSessions sessions={tuesdaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Miércoles({wednesdaySessions?.length})</summary>
                <ClientSessions sessions={wednesdaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl  m-2 underline">Jueves({thursdaySessions?.length})</summary>
                <ClientSessions sessions={thursdaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Viernes({fridaySessions?.length})</summary>
                <ClientSessions sessions={fridaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Sábado({saturdaySessions?.length})</summary>
                <ClientSessions sessions={saturdaySessions} validated={validated}/>
                <p className="bg-gray-700 open:w-full h-px m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Domingo({sundaySessions?.length})</summary>
                <ClientSessions sessions={sundaySessions} validated={validated}/>
            </details>
            <p className="bg-gray-700 w-full h-px m-2 rounded-full" />

        </div>
    )
}
