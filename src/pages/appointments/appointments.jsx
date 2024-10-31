import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/navibar/navbar"

import Appointment from "../../components/appointment/appointment"
import'./appointmts.styles.css'
import { useEffect, useState } from "react"
import api from "../../constants/api"


function Appointments (){

    const navigate  = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [idDoctorSelected, setIdDoctorSelected] = useState("")
    const [dtStartSelected, setDtStartSelected] = useState("")
    const [dtEndSelected, setDtEndSelected] = useState("")

    function ClickEdit(id_appointment){
        navigate('/appointments/edit/' + id_appointment)
    }
    function ClickDelete(id_appointment){
        console.log('Deletar...' + id_appointment);
    }

    function ChangeDoctor(e){
        
        setIdDoctorSelected(e.target.value)
    }

    async function LoadDoctors(){
        try {
              const response = await api.get('/doctors')

              if(response.data){
                  setDoctors(response.data)
              }
          } 
        catch (error) {
              if(error.response?.data.error)
              alert(error.response?.data.error)
          else
              alert("Erro carregar a lista de médicos. Tente novamente mais tarde.")
              console.log(error);  
        }
  }


    async function LoadAppointments(){
          try {
                const response = await api.get('/admin/appointments', {
                    params: {
                        id_doctor: idDoctorSelected,
                        dt_start: dtStartSelected,
                        dt_end: dtEndSelected
                    }
                })

                if(response.data){
                    setAppointments(response.data)
                }
            } 
          catch (error) {
                if(error.response?.data.error){
                alert(error.response?.data.error)
                
                if(error.response.status == 401)
                    navigate("/")
            }   
            else
                alert("Erro ao carregar os Agendamentos. Tente novamente mais tarde.")
                console.log(error);  
          }
    }

    useEffect(() => {

        LoadAppointments()
        LoadDoctors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="container-fluid  mt-page">
        <Navbar />
        <div className="d-flex justify-content-between align-items-center">
            <div className=" d-flex align-items-center">
                <h2 className="d-inline">Agendamentos</h2>
                <Link to='/appointments/add' className="btn btn-outline-primary ms-5">Novo Agendamento</Link>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                <input type="date" className="form-control" id="startDate" onChange={(e) => {setDtStartSelected(e.target.value)}}/>
                <span className="m-2">Até</span>
                <input type="date" className="form-control" id="endDate" onChange={(e) => {setDtEndSelected(e.target.value)}} />
                <div className="form-control ms-3 me-3">
                    <select name="doctor" id="doctor" value={idDoctorSelected} onChange={ChangeDoctor}>
                        <option value=""> Todos os médicos</option>
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
                <button className="btn btn-primary" type="button" onClick={LoadAppointments}>Filtrar</button>
            </div>
        </div>

        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Paciente</th>
                        <th scope="col">Médico</th>
                        <th scope="col">Serviço</th>
                        <th scope="col" className="text-end">Data/Hora</th>
                        <th scope="col" className="text-end">Valor</th>
                        <th scope="col" className="col-buttons"></th>
                    </tr>
                </thead>
                <tbody>
                     {
                        appointments.map((ap) => {
                            return <Appointment key={ap.id_appointment}
                                id_appointment={ap.id_appointment}
                                user={ap.paciente}
                                doctor={ap.doctor}
                                service={ap.service}
                                booking_date={ap.booking_date}
                                booking_hour={ap.booking_hour}
                                price={ap.price}
                                clickEdit={ClickEdit}
                                clickDelete={ClickDelete}
                            
                                />
                        })
                     }
                </tbody>
            </table>
        </div>
    
    </div>
}

export default Appointments