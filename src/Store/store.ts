import { create } from "zustand"


interface ShowHide{
    show:boolean,
    showHide:()=>void
}

type Adress={
    street:string,
    city:string
}
export type userData = {
    username: string,
    email: string,
    phone: string,
    address:Adress
    
}
interface Fetching{
    datas:userData[],
    newdatas:userData[],
    fetch:(data:userData[])=>void,
    fetchNewData:(data:userData[])=>void,
    

}

interface Panel{
    active:any,
    setPanel:(index:any)=>void

}

export const useShowHide=create<ShowHide>((set,get)=>({
    show:false,
    showHide:()=>set((state)=>{
        return {show:!state.show}
    })
}))

export const useFetching=create<Fetching>((set)=>({
    datas:[],
    newdatas:[],
    fetch: (data:userData[])=>set({datas:data}),
    fetchNewData: (data:userData[])=>set({newdatas:data}),

}))

export const usePanel=create<Panel>((set,get)=>({
    active:null,
    setPanel:(index:any)=>{
        const active=get().active
        if(index===active){

            return set({active:null})
        }
        set({active:index})
    }
}))