import "./register.styles.css"
import logo from '../../assets/logo.png'
import fundo from '../../assets/fundo.png'

function Register (){
    return <div className="row">
    <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-register">
            <img src={logo} alt="" srcSet="Logo Agendei" className="logo mb-4" />
            <h5 className="mb-5">Crie sua conta agora mesmo.</h5>
            <h5 className="mb-4 text-secondary">Informe os dados abaixo</h5>

            <div className="mt-4">
                <input type="text" placeholder="Nome"
                className="form-control"/>
            </div>
            <div className="mt-2">
                <input type="email" placeholder="E-mail"
                className="form-control"/>
            </div>
            <div className="mt-2">
                <input type="password" placeholder="Senha"
                className="form-control"/>
            </div>

            <div className="mt-2">
                <input type="password" placeholder="Confirme sua Senha"
                className="form-control"/>
            </div>
        
            <div className="mt-5 mb-5">
                <button className="btn btn-primary w-100">Cadastrar</button>
            </div>
            <div>
                <span className="me-1">Já tem uma conta. </span>
                <a  href="#">Acessar agora! </a>
            </div>
        </form>
        
    </div>

    <div className="col-sm-7">
        <img src={fundo} alt="Imagem de medico verificando seus agendamentos no smartphone" className="background-login" />
    </div>
</div>
}

export default Register