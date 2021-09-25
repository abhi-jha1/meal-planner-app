import ReactDOM from "react-dom";
import createRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = createRoutes();

ReactDOM.render(routes, document.querySelector('#root'));