import css from './Contact.module.css'
import { HiPhone } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';


export default function Contact({ data: { id, name, number } }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
    dispatch(deleteContact(id));
    };
    
    return (
        <div className={css.container}>
            <div>
                <div className={css.box}>
                <HiUser />
            <p>{name}</p>
            </div>
            <div className={css.box}>
                <HiPhone />
                <p>{number}</p>
            </div>
            </div>            
            <button className={css.button} onClick={handleDelete}>
                Delete</button>
        </div>
    );
}
