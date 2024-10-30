
import Navbar from './../../components/navibar/navbar';
import { doctors, doctors_services } from '../../constants/data'
import { Link, useParams } from 'react-router-dom';


function AppointmentAdd(){

    const {id_appointment} = useParams()

    return<>
    <Navbar />

    <div className='container-fluid mt-page'>
        <div className='row col-lg-4 offset-lg-4'>
            <div className='col-12 mt-2'>
               <h2>
               {
                id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"
               }
               </h2>
            </div>
            <div className='col-12 mt-4'>
                <label htmlFor="doctor" className='form-label'> Médicos</label>
                <div className="form-control">
                    <select name="doctor" id="doctor">
                        <option value="0"> Selecione o médico</option>
                        {
                            doctors.map((doc) => {
                                return <option key={doc.id_doctor}
                                    value={doc.id_doctor}>
                                    {doc.name}
                                </option>
                            })
                        }
                        
                    </select>
                </div>
            </div>

            <div className='col-12 mt-3'>
                <label htmlFor="service" className='form-label'>Serviço</label>
                <div className="form-control">
                    <select name="service" id="service">
                        <option value="0"> Selecione o serviço</option>
                        {
                            doctors_services.map((serv) => {
                                return <option key={serv.idservice}
                                    value={serv.idservice}>
                                    {serv.description}
                                </option>
                            })
                        }
                        
                    </select>
                </div>
            </div>

            <div className='col-6 mt-3'>
                <label htmlFor="bookingDate" className='form-label'>Data</label>
                <input type="date" name="bookingDate" id="bookingDate" className='form-control'/>
            </div>
            <div className='col-6 mt-3'>
                <label htmlFor="bookingHour" className='form-label'>Horário</label>
                <div className='form-control mb-2'>
                    <select name="bookingHour" id="bookingHour">
                        <option value="0">Horário</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                    </select>
                </div>
            </div>

            <div className='col-12 mt-4'>
                <div className='d-flex justify-content-end align-items-center'>
                       <Link to="/appointments" className='btn btn-outline-primary me-3'>Cancelar</Link>
                       <button className='btn btn-primary'>Salvar Agendamento</button>
                </div>
            </div>
        </div>
    </div>

    </>

}

export default AppointmentAdd