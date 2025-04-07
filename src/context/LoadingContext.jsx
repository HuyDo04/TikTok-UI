import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const values = {
        loading,
        setLoading,
    };

    return <LoadingContext value={values}>{children}</LoadingContext>;
};
