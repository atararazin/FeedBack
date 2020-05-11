import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Component} from 'react';



/*
const ConfirmWindow = ({ onCancel}) => {
    return (confirmAlert({
      
      title: 'Confirm to submit',
      message: "Are you sure to sumbit? You won't be able to undo this." ,
      buttons: 
      [
        {
          label: 'Yes',
        },
        {
          label: 'No',
          onClick: () => onCancel
        }
      ]
    })
    );

}*/



class ConfirmWindow extends Component{

    submit = ({onCancel}) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: "Are you sure to sumbit? You won't be able to undo this." ,
          buttons: 
          [
            {
              label: 'Yes',
            },
            {
              label: 'No',
              onClick: () => onCancel
            }
          ]
        });
      };
     
      render() {
        const {onCancel} = this.props;
        return (this.submit({onCancel}));
      }



}


export default ConfirmWindow;