
import React, { useEffect, useState } from 'react'
import { useFetching, usePanel, useShowHide } from '../Store/store'
import axios from 'axios'
import { userData } from '../Store/store'



const Dropdown = () => {

    const { show, showHide } = useShowHide((state) => state)
    const [activeQn, setActiveQn] = useState(null);
    const active = usePanel((state) => state.active)
    const setPanel = usePanel((state) => state.setPanel)
    const fetch = useFetching((state) => state.fetch)
    const datas = useFetching((state) => state.datas)
    const fetchNewData = useFetching((state) => state.fetchNewData)
    const newdatas = useFetching((state) => state.newdatas)



    console.log(active)


    const toggle = (index: any) => {
        console.log(index)
        // If the clicked qn is already active, then collapse it
        if (activeQn === index) {
            return setActiveQn(null)
        }
        // Otherwise show the answer to the clicked qn
        setActiveQn(index)
    };




    useEffect(() => {
        const arr: userData[] = []
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
            res.data.map((items: userData) => {
                const { username, email, phone, address } = items

                arr.push({
                    username: username,
                    email: email,
                    phone: phone,
                    address: address
                    //destructuring address????
                })
            })
            fetchNewData(arr)
        })
    }, [])
    console.log(newdatas)

    return (
        <div className="dropdown flex gap-8 mx-auto justify-center items-center p-8 border shadow-lg">

            {
                newdatas.map((item, index) => {
                    const { email, phone, username, address: { street, city } } = item
                    return (
                        <div key={index} className='relative'>
                            <button className={`${index % 3 === 0 ? "bg-green-600" : index % 3 === 1 ? "bg-yellow-500" : "bg-red-500"} text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center`}>
                                <span className="mr-1">
                                    {
                                        username
                                    }
                                </span>
                                <svg onClick={() => setPanel(index)} className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>



                            </button>
                            {
                                active === index ? <ul className={`${index % 3 === 0 ? "bg-green-600" : index % 3 === 1 ? "bg-yellow-500" : "bg-red-500"} absolute text-gray-700 pt-1 w-[250px] mt-1`}>
                                    <li className=""><a className="hover:hover:bg-emerald-700 py-2 px-4 block whitespace-no-wrap" href="#">{street + ", " + city}</a></li>
                                    <li className=""><a href={`mailto: ${email}`} className=" hover:bg-emerald-700 py-2 px-4 block whitespace-no-wrap">{email}</a></li>
                                    <li className=""><a className="hover:hover:bg-emerald-700 py-2 px-4 block whitespace-no-wrap" href={`tel:+${phone}`}>{phone}</a></li>

                                </ul> : null

                            }

                        </div>

                    )
                })

            }



        </div>
    )
}

export default Dropdown