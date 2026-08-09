import { Forklift, HardHat, Pickaxe, Tractor } from 'lucide-react'
import React from 'react'

export default function AboutUsCard() {

    const services = [
        {
            id: 1,
            label: "EarthWorks"
        },
        {
            id: 2,
            label: "Heavy Equipments Hire"
        },
        {
            id: 3,
            label: "Heavy Machine Operations"
        }
    ]

  return (
    <div className='flex flex-col md:flex-row gap-10'>
        {
            services.map((service, idx)=>(
                <div
                    key={service.id}
                    className='flex flex-col items-center gap-3 p-3 border-3 border-foreground! rounded-2xl shadow '>
                        {
                            service.label == "EarthWorks" ?
                                <Pickaxe size={50} className='text-primary' /> :
                                service.label == "Heavy Equipments Hire" ?
                                <Forklift size={50} className='text-primary' /> :
                                <HardHat size={50} className='text-primary' />
                        }
                        <h5 className='text-center'>
                            {service.label}
                        </h5>
                </div>
            ))
        }
    </div>
  )
}
