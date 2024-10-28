import { Link } from "react-router-dom"
import Navbar from "../../components/navibar/navbar"
import {doctors} from '../../constants/data'


function Appointments (){
    return <div className="container-fluid  mt-page">
    <Navbar />
    <div className="d-flex justify-content-between align-items-center">
        <div className=" d-flex align-items-center">
            <h2 className="d-inline">Agendamentos</h2>
            <Link to='/appointments/add' className="btn btn-outline-primary ms-5">Novo Agendamento</Link>
        </div>
        <div className="d-flex justify-content-end align-items-center">
            <input type="date" className="form-control" id="startDate" />
            <span className="m-2">Até</span>
            <input type="date" className="form-control" id="endDate" />
            <div className="form-control ms-3 me-3">
                <select name="doctor" id="doctor">
                    <option value=""> Todos os médicos</option>
                    {
                        doctors.map((doc) => {
                            return <option
                                value={doc.id_doctor}>
                                {doc.name}
                            </option>
                        })
                    }
                    
                </select>
            </div>
            <button className="btn btn-primary">Filtrar</button>
        </div>
    </div>
    </div>
}

export default Appointments