import React, { createContext } from "react";

interface FoodsProviderProps{
    children: React.ReactNode;
}

interface FoodsContextData{
    foods: string[],
    editingFood: {},
    modalOpen: boolean,
    editModalOpen: boolean,
}

const FoodsContext = createContext({})

export function FoodsProvider({children}:FoodsProviderProps){


return(
    <FoodsContext.Provider value={{}}>
        {children}
    </FoodsContext.Provider>
)

}