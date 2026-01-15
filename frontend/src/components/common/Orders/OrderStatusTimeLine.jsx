import React, { Fragment } from 'react'
import {
    Clock,
    Package,
    CheckCircle,
    XCircle,
} from "lucide-react";

const ICON = {
    PENDING: <Clock size={18} />,
    CONFIRMED: <Package size={18} />,
    DELIVERED: <CheckCircle size={18} />,
    REJECTED: <XCircle size={18} />,

}

const STATUS = ["PENDING", "CONFIRMED", "DELIVERED",]



const OrderStatusTimeLine = ({ selectedOrderStatus }) => {
    const currentIndex = STATUS.indexOf(selectedOrderStatus)
    
    return (
        <div className='w-full relative '>
            <div className='flex items-center z-12'>
                {STATUS.map((step, index) => (<Fragment key={index}>
                    <div className='flex flex-col items-center gap-2'>

                        <div className={`
                                     flex justify-center items-center w-7 h-7 md:w-9 md:h-9 rounded-full border
                                      transition-all duration-300
                                     ${index <= currentIndex
                                ? "bg-green-500 text-white scale-105 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                                : "bg-white text-gray-400"}`}
                        >
                            {ICON[step]}</div>
                        <span className={
                            `${index <= currentIndex ? "text-green-400" : ""} text-xs md:text-sm font-medium`}>
                            {step}</span>

                    </div>
                    {index < STATUS.length - 1 && <div className={`${index < currentIndex ? "bg-green-500" : "bg-gray-100"} flex-1 mx-1 md:mx-2 h-[4px] `} />}
                </Fragment>))}
            </div>


        </div>
    )
}

export default OrderStatusTimeLine
