import { useAuth } from '../../utils/AuthContext'
import { useSelector } from 'react-redux';
import './Account.scss'

function Account() {
    const { logoutUser } = useAuth();
    const loginFormData = useSelector((state) => state.formData.loginFormData);

    return (

        <div className='container'>
            <div className=' d-flex justify-content-center'>


                <div className="d-flex flex-column border w-50 bg-white p-3 rounded" >
                    {loginFormData && (
                        <p className='fw-bold text-black'>User Email : {loginFormData?.email}</p>

                    )}

                    < button
                        onClick={logoutUser}
                        className="logout_button  rounded border-0 text-white p-2 bg-warning "
                    >
                        Logout

                    </button >
                </div >
            </div>

        </div>
    );
}

export default Account
