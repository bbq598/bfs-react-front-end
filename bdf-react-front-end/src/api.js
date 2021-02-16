import axios from 'axios';
import Cookies from 'js-cookie';


export default axios.create({
    headers: {'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' + Cookies.get('JWT-TOKEN')}
});