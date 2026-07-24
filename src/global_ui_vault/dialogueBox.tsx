import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import Card from './card';

export default function DialogueBox({
    heading,
    body,
    foot,
    isActive, //to prevent closing when certain conditions are true e.g while submiting
    setDialogueBoxState,
    classname = "w-[350px]"
}: {
    heading?: ReactNode;
    body: ReactNode;
    foot?: ReactNode;
    isActive?: boolean;
    setDialogueBoxState?: Dispatch<SetStateAction<boolean>>
    classname?: string
}) {

    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node) &&
                !isActive &&
                setDialogueBoxState
            ) {
                setDialogueBoxState(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setDialogueBoxState])

    return (
        <div className='fixed inset-0 bg-[#0000006d] flex justify-center z-20'>
            <Card
                ref={cardRef}
                variant="outline"
                hover={false}
                className={`max-h-[80vh] my-auto overflow-y-scroll hide-scrollbar ${classname}`}>
                {heading && heading}
                {body}
                {foot && foot}
            </Card>
        </div>
    )
}
