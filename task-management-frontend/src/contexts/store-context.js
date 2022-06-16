import React, { useContext } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

export const StoreContext = React.createContext({});

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = ({ children, ...stores }) => {
    return (
        <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function useStore(mapActions) {
    const globalStore = useStoreContext();
    let store;
    if (typeof mapActions === "string") {
        store = globalStore[mapActions];
    } else {
        store = mapActions(globalStore);
    }
    if (typeof store === "undefined") {
        const name = typeof store === "string" ? store : store.constructor.name;
        throw new Error(
            "Store '" +
            name +
            "' is not available! Make sure it is passed on to the Store Provider"
        );
    }
    return observer(store);
}
