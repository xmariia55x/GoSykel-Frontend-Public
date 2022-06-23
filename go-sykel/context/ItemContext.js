import React, { useState, useMemo } from 'react';

const ItemContext = React.createContext();
export function ItemProvider(props) {
    const [avatarId, setAvatarId] = useState('')
    const [headerId, setHeaderId] = useState('')

    const setItemId = (id, type) => {
        if(type == "avatar") {
            setAvatarId(id)
        } else if (type == "header"){
            setHeaderId(id)
        }

    };

    const getSelectedAvatar = () => {
        return avatarId;
    }

    const getSelectedHeader = () => {
        return headerId;
    }

    const value = useMemo(() => {
        return ({
            setItemId,
            getSelectedAvatar,
            getSelectedHeader
        })
    }, [avatarId, headerId])
    return <ItemContext.Provider value={value} {...props} />
}

export function useItem() {
    const context = React.useContext(ItemContext);
    if (!context) {
        throw new Error('contexto no existe');
    }
    return context;
}