'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

const Blocks = () => {
    const [selected, setSelected] = useState<'0' | '1' | '2'>('0')
    return (
        <div className="absolute bottom-0 z-10 left-6 w-80 bg-card px-4 rounded-t-xl border-x border-t">
            <Accordion type="single" value={selected} className="w-full">
                <AccordionItem value="1">
                    <AccordionTrigger onClick={() => setSelected(selected === '1' ? '0' : '1')}>Компоненты</AccordionTrigger>
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
                <AccordionItem value="2">
                    <AccordionTrigger onClick={() => setSelected(selected === '2' ? '0' : '2')}>Обложка</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full aspect-[4/3] rounded-lg bg-muted"></div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Blocks