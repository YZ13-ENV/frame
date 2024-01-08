'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

const Blocks = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="absolute bottom-0 z-10 left-6 w-80 bg-card px-4 rounded-t-xl border-x border-t">
            <Accordion type="single" value={open ? '1' : '0'} className="w-full">
                <AccordionItem value="1">
                    <AccordionTrigger onClick={() => setOpen(!open)}>Компоненты</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full h-fit flex flex-col gap-2">
                            <div className="w-full rounded-lg h-9 bg-muted"></div>
                            <div className="w-full rounded-lg h-9 bg-muted"></div>
                            <div className="w-full rounded-lg h-9 bg-muted"></div>
                            <div className="w-full rounded-lg h-9 bg-muted"></div>
                            <div className="w-full rounded-lg h-9 bg-muted"></div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Blocks