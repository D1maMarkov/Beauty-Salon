import React, { useState } from "react";
import Alert from "../../../components/Alert";
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

    async function validForm(){
        const response = await fetch(`/create-booked-online`, {
            method: "post",
            body: `name=${name}&secondname=${secondname}&phone=${phone}&date=${date.date}&month=${date.month}&time=${date.time}&service_id=${service}`,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then((response) => {
                if (!response.ok) {
                    setOpenAlertWarning(true);
                    throw new Error(response.status)
                }
            
                return response.json()
              })

        if (response !== undefined){
            if (response.status === "valid"){
                setOpenAlertSuccess(true);
                setOpen(false);
            }
            else{
                const errors = response.errors

                if (errors.name !== undefined){
                    setErrorName(errors.name[0]);
                }
                else{
                    setErrorName(null);
                }

                if (errors.secondname !== undefined){
                    setErrorSecondname(errors.secondname[0])
                }
                else{
                    setErrorSecondname(null)
                }

                if (errors.phone !== undefined){
                    setErrorPhone(errors.phone[0]);
                }
                else{
                    setErrorPhone(null);
                }
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
                <FormControl error={errorName !== null} variant="standard" className={styles.field}>
                    <InputLabel htmlFor="name">Имя</InputLabel>
                    <Input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        aria-describedby="name__error"
                    />
                    <FormHelperText id="name__error">{ errorName }</FormHelperText>
                </FormControl>

                <FormControl error={errorSecondname !== null} variant="standard" className={styles.field}>
                    <InputLabel htmlFor="component-error">Фамилия</InputLabel>
                    <Input
                        value={secondname}
                        onChange={event => setSecondname(event.target.value)}
                        aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">{ errorSecondname }</FormHelperText>
                </FormControl>

                <FormControl error={errorPhone !== null} variant="standard" className={styles.field}>
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

                <button id="submitButton" onClick={validForm}>Подтвердить</button>
            </div>
        </div>
        </>
    )
}