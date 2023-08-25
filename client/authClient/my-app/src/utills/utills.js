
import Cookies from 'universal-cookie';

export const setCookiesUtills =   (data) => {
    const cookies = new Cookies();
    const {accessToken , refreshToken} =  data;

    if(accessToken){
    cookies.set("accessToken" , accessToken ,  {expiresIn : '1m'})
    cookies.set('expiresIn' , JSON.stringify(new Date(Date.now() + 60 * 1000)))
    cookies.set("refreshToken" , refreshToken , {expiresIn : '40m'})
    }
    return;
}