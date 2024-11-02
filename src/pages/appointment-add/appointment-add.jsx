
import Navbar from './../../components/navibar/navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../constants/api';




function AppointmentAdd(){

    const navigate = useNavigate()
    const {id_appointment} = useParams()
    const [users, setUsers] = useState([])
    const [doctors, setDoctors] = useState([])
    const [doctors_services, setDoctors_Services] = useState([])
    const [userSelected, setUserSelected] = useState("")
    const [doctorSelected, setDoctorSelected] = useState("")
    const [serviceSelected, setServiceSelected] = useState("")
    const [dateSelected, setDateSelected] = useState("")
    const [hourSelected, setHourSelected] = useState("")


    async function SaveAppointment(){

        const json = {
            id_user: userSelected,
            id_doctor: doctorSelected,
            id_service: serviceSelected,
            booking_date: dateSelected,
            booking_hour: hourSelected
        }

        try {
            const response = id_appointment > 0 ? 
                await api.put("/admin/appointments/" + id_appointment, json) 
            : 
                await api.post("/admin/appointments", json)

            if(response.data){
                navigate("/appointments")
            }
        } catch (error) {
            if(error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/")
                alert(error.response?.data.error)
            
              }   
              else
              alert("Erro salvar agendamento.")
              console.log(error);  
        }
        

    }

    async function LoadUsers(){
        try {
              const response = await api.get('/admin/users')

              if(response.data){
                  setUsers(response.data)
              }
          } 
        catch (error) {
              if(error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/")
                alert(error.response?.data.error)
            
              }   
              else
              alert("Erro carregar a lista de pacientes.")
              console.log(error);  
        }
    } 

    async function LoadDoctors(){
        try {
              const response = await api.get('/doctors')

              if(response.data){
                  setDoctors(response.data)

                 // Se for modulo de edição 
                if(id_appointment > 0)
                    LoadAppointment(id_appointment)
              }
          } 
        catch (error) {
              if(error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/")
                alert(error.response?.data.error)
            
              }   
              else
              alert("Erro carregar a lista de médicos.")
              console.log(error);  
        }
    } 

    async function LoadServices(id_doctor){

        if(!id_doctor){
            return
        }
        try {
              const response = await api.get('/doctors/' + id_doctor + '/services')

              if(response.data){
                setDoctors_Services(response.data)
              }
          } 
        catch (error) {
              if(error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/")
                alert(error.response?.data.error)
            
              }   
              else
              alert("Erro carregar a lista de médicos.")
              console.log(error);  
        }
    } 

    async function LoadAppointment(id){
        try {
              const response = await api.get('/admin/appointments/' + id)

              if(response.data){
                setUserSelected(response.data.id_user)
                setDoctorSelected(response.data.id_doctor)
                setServiceSelected(response.data.id_service)
                setDateSelected(response.data.booking_date)
                setHourSelected(response.data.booking_hour)
              }
          } 
        catch (error) {
              if(error.response?.data.error){
                if(error.response.status == 401)
                    return navigate("/")
                alert(error.response?.data.error)
            
              }   
              else
              alert("Erro carregar dados do agendamento.")
              console.log(error);  
        }
    } 

  useEffect(() => {

    LoadUsers()
    LoadDoctors()

 
}, [])

useEffect(() => {
    LoadServices(doctorSelected)
}, [doctorSelected])

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
                <label htmlFor="user" className='form-label'>Paciente</label>
                <div className="form-control">
                    <select name="user" id="user"
                     value={userSelected} onChange={(e) => {setUserSelected(e.target.value)}}>
                        <option value="0"> Selecione o paciente</option>
                        {
                            users.map((u) => {
                                return <option key={u.id_user}
                                    value={u.id_user}>
                                    {u.name}
                                </option>
                            })
                        }
                        
                    </select>
                </div>
            </div>

            <div className='col-12 mt-4'>
                <label htmlFor="doctor" className='form-label'> Médicos</label>
                <div className="form-control">
                    <select name="doctor" id="doctor"
                    value={doctorSelected} onChange={(e) => {setDoctorSelected(e.target.value)}}>
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
                    <select name="service" id="service"
                    value={serviceSelected} onChange={(e) => {setServiceSelected(e.target.value)}}>
                        <option value="0"> Selecione o serviço</option>
                        {
                            doctors_services.map((serv) => {
                                return <option key={serv.id_service}
                                    value={serv.id_service}>
                                    {serv.description}
                                </option>
                            })
                        }
                        
                    </select>
                </div>
            </div>

            <div className='col-6 mt-3'>
                <label htmlFor="bookingDate" className='form-label'>Data</label>
                <input type="date" name="bookingDate" id="bookingDate" className='form-control'
                value={dateSelected} onChange={(e) => {setDateSelected(e.target.value)}}/>
            </div>
            <div className='col-6 mt-3'>
                <label htmlFor="bookingHour" className='form-label'>Horário</label>
                <div className='form-control mb-2'>
                    <select name="bookingHour" id="bookingHour"
                    value={hourSelected} onChange={(e) => {setHourSelected(e.target.value)}}>
                        <option value="00:00">Horário</option>
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
                       <button className='btn btn-primary' type='button' onClick={SaveAppointment}>Salvar Agendamento</button>
                </div>
            </div>
        </div>
    </div>

    </>

}

export default AppointmentAdd