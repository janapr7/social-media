import axios from "axios";
import { URL_API } from "../helper";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const EmailVerification = () => {
    let token = useParams().token
    let navigate = useNavigate();

    useEffect(() => {
        async function verifyEmail() {
            let url = `${URL_API}/verify`;
            try{
                const result = await axios.get(url, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // alert("Profile picture berhasil diperbarui");

                // setTimeout(() => {
                //     navigate('../login');
                // }, 3000);
            }catch(err){
                console.log("Invalid token.")
                console.log(err)
                navigate('../login');
            }
        }
        verifyEmail();
    }, []);

    return (
        <div>Loading...</div>
    )
}