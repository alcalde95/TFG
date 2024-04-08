import { ClientSessions } from "./ClientSessions"

export const ClientWeekSessions = ({ mondaySessions, tuesdaySessions, wednesdaySessions, thursdaySessions, fridaySessions, saturdaySessions, sundaySessions }) => {
    return (
        <div className="w-full flex flex-row flex-wrap">
            <p className="bg-lime-700 w-full h-3 m-2 rounded-full" />
            {mondaySessions && <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Lunes({mondaySessions?.length})</summary>
                <ClientSessions sessions={mondaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>}
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Martes({tuesdaySessions?.length})</summary>
                <ClientSessions sessions={tuesdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Miércoles({wednesdaySessions?.length})</summary>
                <ClientSessions sessions={wednesdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl  m-2 underline">Jueves({thursdaySessions?.length})</summary>
                <ClientSessions sessions={thursdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Viernes({fridaySessions?.length})</summary>
                <ClientSessions sessions={fridaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Sábado({saturdaySessions?.length})</summary>
                <ClientSessions sessions={saturdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Domingo({sundaySessions?.length})</summary>
                <ClientSessions sessions={sundaySessions} />
            </details>
            <p className="bg-lime-700 w-full h-3 m-2 rounded-full" />

        </div>
    )
}
