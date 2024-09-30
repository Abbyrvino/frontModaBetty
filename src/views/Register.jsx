import FormularioRegister from "../components/FormularioRegister";

function Register() {
    return (
        <div className="flex bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/bg_Login.jpg)'}}>
            <div className="w-full sm:min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gray-800 bg-opacity-75 rounded-lg p-8">
                        <div className="flex flex-col items-center">
                            <h1 className="mb-4 text-center text-white">Registrarse</h1>
                            <FormularioRegister />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register
