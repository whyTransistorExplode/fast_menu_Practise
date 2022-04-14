import styles from './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function BasicLayout(props) {

  return (
    <div>

      {props.children}
    </div>
  );
}

export default BasicLayout;
