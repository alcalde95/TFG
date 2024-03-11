
export const Session = ({ session }) => {

    return (
        <div key={session.data_time}>
            <p >{session.data_time}</p>
        </div>
    )
}
