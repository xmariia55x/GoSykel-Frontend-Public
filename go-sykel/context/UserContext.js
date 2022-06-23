import React, { useState, useMemo } from 'react';
import { Constants } from '../constants/Constants';
const UserContext = React.createContext();

const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
export function UserProvider(props) {
    const [userId, setUserId] = useState('')
    const [token, setToken] = useState('')

    const invalidateTokenUserId = () => {
        setToken('')
        setUserId('')
    }
    const createNewUser = async (email, nickname) => {
        try {
            let response = await fetch(Constants.SERVER_URL + '/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    nickname: nickname
                })
            })

            let responseData = await response.json()
            if(responseData.id !== undefined){
                setUserId(responseData.id)
            }
            if(responseData.token !== undefined){
                setToken(responseData.token)
            }
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    };

    const deleteUser = async () => {
        try {
            let response = await fetch(Constants.SERVER_URL + '/users/' + userId,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token 
                }
            })
            let responseData = await response.json()
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    };

    const sendLogInInformation = async (email) => {
        try {
            let response = await fetch(Constants.SERVER_URL + '/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.toLowerCase()
                })
            })
            let responseData = await response.json()  
            if(responseData.id !== undefined){
                setUserId(responseData.id)
            }
            if(responseData.token !== undefined){
                setToken(responseData.token)
            }
            if(responseData.message !== undefined){
                alert(responseData.message)
            }
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    };

    const updateUserInformation = async (nickname, avatar, header) => {
        try {
            let response = await fetch(Constants.SERVER_URL + '/users/' + userId, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify({
                    nickname: nickname,
                    avatar: avatar,
                    header: header
                })
            })
            let responseData = await response.json() 
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    };

    const value = useMemo(() => {
        return ({
            userId,
            token,
            deleteUser,
            createNewUser,
            sendLogInInformation,
            updateUserInformation,
            invalidateTokenUserId
        })
    }, [userId, token])
    return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('contexto no existe');
    }
    return context;
}