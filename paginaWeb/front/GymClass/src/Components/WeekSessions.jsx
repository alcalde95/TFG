import { Sessions } from './Sessions'

export const WeekSessions = ({ mondaySessions, tuesdaySessions, wednesdaySessions, thursdaySessions, fridaySessions, saturdaySessions, sundaySessions }) => {
    return (
        <div className="w-full flex flex-row flex-wrap">
            <p className="bg-lime-700 w-full h-3 m-2 rounded-full" />
            {mondaySessions && <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Lunes({mondaySessions.length})</summary>
                <Sessions sessions={mondaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>}
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Martes({tuesdaySessions.length})</summary>
                <Sessions sessions={tuesdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Miércoles({wednesdaySessions.length})</summary>
                <Sessions sessions={wednesdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl  m-2 underline">Jueves({thursdaySessions.length})</summary>
                <Sessions sessions={thursdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Viernes({fridaySessions.length})</summary>
                <Sessions sessions={fridaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Sábado({saturdaySessions.length})</summary>
                <Sessions sessions={saturdaySessions} />
                <p className="bg-lime-700 open:w-full h-3 m-2 rounded-full" />
            </details>
            <details className="open:w-full">
                <summary className="text-2xl m-2 underline">Domingo({sundaySessions.length})</summary>
                <Sessions sessions={sundaySessions} />
            </details>
            <p className="bg-lime-700 w-full h-3 m-2 rounded-full" />

        </div>
    )
}
