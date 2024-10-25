import "./login.styles.css"
import logo from '../../assets/logo.png'
import fundo from '../../assets/fundo.png'

function Login (){
    return <div className="row">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
            <form className="form-signin">
                <img src={logo} alt="" srcSet="Logo Agendei" className="logo mb-4" />
                <h5 className="mb-5">Gerencia seus agendamentos de forma descomplicada.</h5>
                <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

                <div className="mt-4">
                    <input type="email" placeholder="E-mail"
                    className="form-control"/>
                </div>
                <div className="mt-2">
                    <input type="password" placeholder="Senha"
                    className="form-control"/>
                </div>
            
                <div className="mt-5 mb-5">
                    <button className="btn btn-primary w-100">Login</button>
                </div>
                <div>
                    <span className="me-1">Não tem uma conta. </span>
                    <a  href="#">Criar agora! </a>
                </div>
            </form>
            
        </div>

        <div className="col-sm-7">
            <img src={fundo} alt="Imagem de medico verificando seus agendamentos no smartphone" className="background-login" />
        </div>
    </div>
}

export default Login