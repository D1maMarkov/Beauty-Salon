import React, { useState, useEffect } from "react";
import Alert from "../../Alert";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import styles from "./modal.module.scss";


export const Modal = ({open, setOpen, date, service}) => {
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);

    const [secondname, setSecondname] = useState("");
    const [errorSecondname, setErrorSecondname] = useState(null);

    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState(null);

    function validForm(){
        name.length == 0 ? setErrorName("Введите ваше имя") : setErrorName(null);
        secondname.length == 0 ? setErrorSecondname("Введите вашу фамилию") : setErrorSecondname(null);
        phone.length == 0 ? setErrorPhone("Введите ваш телефон") : setErrorPhone(null);

        if (name.length > 0 &&  secondname.length > 0 && phone.length > 0 && errorPhone == null){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    setOpenAlertSuccess(true);
                    setOpen(false);
                }
                else if (this.readyState == 4 && this.status == 202){
                    setOpenAlertWarning(true);
                }
            }

            xhttp.open("GET", `/get-booked-online/${name}/${secondname}/${phone}/${date.date}/${date.month}/${date.time}/${service}`);
            xhttp.send();
        }
    }

    function validPhone(){
        const re = /[+][7]\d{10}/g;
        const myArray = re.exec(phone);

        if (phone.length == 0){
            setErrorPhone(null);
        }
        else{
            if (myArray && phone.length == 12){
                setErrorPhone(null);
            }
            else{
                setErrorPhone("Неверный формат номера телефона");
            }
        }
    }

    function handlePhone(event){
        let result = event.target.value.replace(/\D/g, '');
        if (event.target.value[0] == "+"){
            result = "+" + result;
        }

        result.length == 0 ? setPhone("") : setPhone(result[0] == "+" ? result : "+" + result);
    }

    useEffect(validPhone, [phone]);

    useEffect(() => {
        name.length > 0 ? setErrorName(null) : null;
    }, [name])

    useEffect(() => {
        secondname.length > 0 ? setErrorSecondname(null) : null;
    }, [secondname])

    const handleCloseWarning = () => {
        setOpenAlertWarning(false);
    }

    const handleCloseSuccess = () => {
        setOpenAlertSuccess(false);
    }

    const [openAlertWarning, setOpenAlertWarning] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

    return(
        <>
        <Alert open={openAlertWarning} handleClose={handleCloseWarning} severity={"warning"} text={"Запись на это время уже существует"} />
        <Alert open={openAlertSuccess} handleClose={handleCloseSuccess} severity={"success"} text={"Ваша запись успешно сохранена!"} />

        <div style={{ display: open ? "flex" : "none" }} className={styles.booked__form}>
            <img onClick={() => setOpen(false)} src="/static/img/cross.png" />
            <div style={{ width: "76%" }}>

                <FormControl error={errorName == null ? false : true} variant="standard" className={styles.field}>
                    <InputLabel htmlFor="name">Имя</InputLabel>
                    <Input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        aria-describedby="name__error"
                    />
                    <FormHelperText id="name__error">{ errorName }</FormHelperText>
                </FormControl>

                <FormControl error={errorSecondname == null ? false : true} variant="standard" className={styles.field}>
                    <InputLabel htmlFor="component-error">Фамилия</InputLabel>
                    <Input
                        value={secondname}
                        onChange={event => setSecondname(event.target.value)}
                        aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">{ errorSecondname }</FormHelperText>
                </FormControl>

                <FormControl error={errorPhone == null ? false : true} variant="standard" className={styles.field}>
                    <InputLabel htmlFor="component-error">Телефон (+7)</InputLabel>
                    <Input
                        value={phone}
                        autoComplete="new-password"
                        id="component-error"
                        onChange={event => handlePhone(event)}
                        aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">{ errorPhone }</FormHelperText>
                </FormControl>

                <button id="submitButton" onClick={validForm} >Подтвердить</button>
            </div>
        </div>
        </>
    )
}