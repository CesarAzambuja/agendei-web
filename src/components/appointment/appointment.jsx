/* eslint-disable react/prop-types */


function Appointment(props){

    // const dt = new Date (props.booking_date)
    const dt = new Date(props.booking_date + "T" + props.booking_hour)

    return <tr>
    <td >{props.user}</td>
    <td >{props.doctor}</td>
    <td >{props.service}</td>
    <td className="text-end">{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(dt)} | {props.booking_hour}h</td>
    <td  className="text-end">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.price)}</td>
    <td className="text-end">
        <div className="d-inline me-2">
            <button className="btn btn sm btn-primary" onClick={() => props.clickEdit(props.id_appointment)}><i className="bi bi-pen"></i></button>
        </div>
        
            <button className="btn btn sm btn-danger" onClick={() => props.clickDelete(props.id_appointment)}><i className="bi bi-trash3"></i></button>
        
    </td>
</tr>
}

export default Appointment